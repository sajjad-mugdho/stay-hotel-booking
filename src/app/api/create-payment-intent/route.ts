import prismaDB from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-10-28.acacia",
});

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { booking, payment_intent_id } = body;

    // console.log("Booking data:", body);

    const bookingData = {
      ...booking,
      userId: user.id,
      email: user.emailAddresses[0].emailAddress,
      username: user.firstName,
      currency: "usd",
      paymentIntentId: payment_intent_id,
    };

    console.log("Booking data:22222.......", bookingData);

    let foundBooking;

    if (payment_intent_id) {
      foundBooking = await prismaDB.booking.findUnique({
        where: {
          paymentIntentId: payment_intent_id,
          userId: user.id,
        },
      });
    }

    // console.log("Found booking:", foundBooking);

    const { hotelId, roomId, includeBreakFast, ...updateData } = bookingData;

    if (foundBooking && payment_intent_id) {
      // Update the booking here
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
      );
      if (current_intent) {
        const update_intent = await stripe.paymentIntents.update(
          payment_intent_id,
          {
            amount: booking.totalPrice * 100,
          }
        );

        const res = await prismaDB.booking.update({
          where: { paymentIntentId: payment_intent_id, userId: user.id },
          data: {
            ...updateData,
            breakFastIncluded: includeBreakFast,
            Hotel: {
              connect: {
                id: hotelId,
              },
            },
            room: {
              connect: {
                id: roomId,
              },
            },
          },
        });

        if (!res) {
          return NextResponse.error();
        }

        return NextResponse.json(
          { message: "Booking updated", paymentIntent: update_intent },
          { status: 200 }
        );
      }
    } else {
      // Create new booking

      console.log("Creating new booking", bookingData);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: booking.totalPrice * 100, // Stripe expects the amount in cents
        currency: bookingData.currency,
        automatic_payment_methods: { enabled: true },
      });

      bookingData.paymentIntentId = paymentIntent.id;

      await prismaDB.booking.create({
        data: {
          username: bookingData.username,
          userId: bookingData.userId,
          hotelOwnerId: bookingData.hotelOwnerId,
          email: bookingData.email,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
          breakFastIncluded: bookingData.includeBreakFast,
          currency: bookingData.currency,
          totalPrice: bookingData.totalPrice,
          paymentStatus: false, // default value
          paymentIntentId: bookingData.paymentIntentId,
          Hotel: {
            connect: {
              id: bookingData.hotelId,
            },
          },
          room: {
            connect: {
              id: bookingData.roomId,
            },
          },
        },
      });

      return NextResponse.json(
        { message: "Booking created", paymentIntent },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error creating booking:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
