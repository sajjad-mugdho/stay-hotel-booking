import * as z from "zod";

const HotelAddSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long",
  }),
  country: z.string().min(3, { message: "Country is requred" }),
  city: z.string().min(3, { message: "City is requred" }),
  state: z.string().optional(),
  image: z.string().min(3, { message: "Image is requred" }),
  locationDescription: z
    .string()
    .min(5, { message: "Location is requred at least 5 characters long " }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  laundry: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  bar: z.boolean().optional(),
  swimmingPool: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  bikeRental: z.boolean().optional(),
  movieNight: z.boolean().optional(),
  coffeeShop: z.boolean().optional(),
});

type HotelAddSchemaType = z.infer<typeof HotelAddSchema>;

export { HotelAddSchema };
export type { HotelAddSchemaType };
