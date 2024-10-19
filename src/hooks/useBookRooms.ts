import { Room } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IBookingRoomStore {
  bookingRoomData: BookingRoomTypes | null;
  paymentIntentId: string | null;
  clientSecret: string | null;
  setRoomData: (data: BookingRoomTypes) => void;
  setPaymentIntentId: (paymentIntentId: string) => void;
  setClientSecret: (clientSecret: string) => void;
  reset: () => void;
}

type BookingRoomTypes = {
  room: Room;
  totalPrice: number;
  BreakfastIncluded?: boolean;
  startDate: Date;
  endDate: Date;
};

const useBookRooms = create<IBookingRoomStore>()(
  persist(
    (set) => ({
      bookingRoomData: null,
      paymentIntentId: null,
      clientSecret: null,
      setRoomData: (data) => set({ bookingRoomData: data }),
      setPaymentIntentId: (paymentIntentId) => set({ paymentIntentId }),
      setClientSecret: (clientSecret) => set({ clientSecret }),
      reset: () =>
        set({
          bookingRoomData: null,
          paymentIntentId: null,
          clientSecret: null,
        }),
    }),
    {
      name: "BookRoom",
    }
  )
);

export default useBookRooms;
