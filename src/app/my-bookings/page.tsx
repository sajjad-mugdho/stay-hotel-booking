import React from "react";
import { getBookingsByHotelOwnersId } from "../../../actions/getBookingsByHotelOwnersId";
import { getBookingsByUserId } from "../../../actions/getBookingsByUserId";
import MyBookingClient from "@/components/Booking/MyBookingClient";

type Props = {};

const MyBookings = async (props: Props) => {
  const bookingFromVisitor = await getBookingsByHotelOwnersId();
  const bookingIhaveMade = await getBookingsByUserId();

  if (!bookingIhaveMade || !bookingFromVisitor)
    return <div className="">No data found</div>;
  return (
    <div className="">
      {!!bookingIhaveMade?.length && (
        <>
          <div className="">
            <h2 className="text-xl font-semibold md:text-2xl mb-6 mt-2">
              Here are bookings you are made
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {bookingIhaveMade.map((booking) => (
                <MyBookingClient
                  key={booking.id}
                  booking={{ ...booking, hotel: booking.Hotel }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {!!bookingFromVisitor?.length && (
        <>
          <div className="">
            <h2 className="text-xl font-semibold md:text-2xl mb-6 mt-2">
              Here are bookings you are made
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {bookingIhaveMade.map((booking) => (
                <MyBookingClient
                  key={booking.id}
                  booking={{ ...booking, hotel: booking.Hotel }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookings;
