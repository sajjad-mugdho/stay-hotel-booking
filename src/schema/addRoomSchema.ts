import * as z from "zod";

const RoomAddSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  bedCount: z.string().min(1, { message: "Bed count must be at least 1" }),
  bedRoomCount: z
    .string()
    .min(1, { message: "Bedroom count must be at least 1" }),
  guestCount: z.string().min(1, { message: "Guest count must be at least 1" }),
  kingBed: z.string().min(1, { message: "King bed count must be at least 1" }),
  queenBed: z
    .string()
    .min(1, { message: "Queen bed count must be at least 1" }),
  image: z.string().min(3, { message: "Image is requred" }),
  roomPrice: z.string().min(1, { message: "Price is requred" }),
  breakFastPrice: z.string().min(1, { message: "Price is requred" }).optional(),

  roomService: z.boolean().optional(),
  tv: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  heating: z.boolean().optional(),
  balcony: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  soundProof: z.boolean().optional(),
});

type RoomAddSchemaType = z.infer<typeof RoomAddSchema>;

export { RoomAddSchema };
export type { RoomAddSchemaType };
