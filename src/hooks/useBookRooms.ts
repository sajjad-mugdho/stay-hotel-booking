import { Room } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IBookingRoomStore {
  bookingRoomData: BookingRoomTypes | null;
  paymentIntent: string | null;
  clientSecret: string | null;
  setRoomData: (data: BookingRoomTypes) => void;
  setPaymentIntent: (paymentIntent: string) => void;
  setClientSecret: (clientSecret: string) => void;
  reset: () => void;
}

type BookingRoomTypes = {
  room: Room;
  totalPrice: number;
  BreakfastIncluded: boolean;
  checkIn: string;
  checkOut: string;
  adults: number;
};

const useBookRooms = create<IBookingRoomStore>()(
  persist(
    (set) => ({
      bookingRoomData: null,
      paymentIntent: null,
      clientSecret: null,
      setRoomData: (data) => set({ bookingRoomData: data }),
      setPaymentIntent: (paymentIntent) => set({ paymentIntent }),
      setClientSecret: (clientSecret) => set({ clientSecret }),
      reset: () =>
        set({ bookingRoomData: null, paymentIntent: null, clientSecret: null }),
    }),
    {
      name: "BookRoom",
    }
  )
);

export default useBookRooms;
