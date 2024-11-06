import BookRoomClient from "@/components/Booking/BookRoomClient";
import React from "react";

type Props = {};

const BookRoom = (props: Props) => {
  return (
    <div className="p-8">
      <BookRoomClient />
    </div>
  );
};

export default BookRoom;
