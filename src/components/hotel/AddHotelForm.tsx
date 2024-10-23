/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { HotelAddSchema, HotelAddSchemaType } from "@/schema/addHotelSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hotel, Room } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { Button } from "../ui/button";
import { Button as Button2 } from "../ui/button-2";
import {
  Edit,
  Edit3,
  EyeIcon,
  Loader2,
  PlusIcon,
  TerminalIcon,
  Trash2,
  XCircle,
} from "lucide-react";
import useLocation from "@/hooks/useLocation";
import { ICity, IState } from "country-state-city";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import AddRoom from "../Room/Modal/AddRoomForm";
import CheckboxGroup from "./SelectItems";
import RoomCard from "../Room/Modal/RoomCard";
import { Separator } from "../ui/separator";

export type HotelWithRooms = Hotel & {
  rooms: Room[];
};

interface AddHotelFromProps {
  hotel: HotelWithRooms | null;
}

const AddHotelForm = ({ hotel }: AddHotelFromProps) => {
  const [image, setImage] = useState<string | undefined>(hotel?.image);
  const [imageIsDeleting, setImageIsDeleting] = useState<boolean>(false);
  const [hotelIsDeleting, setHotelIsDeleting] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  const { toast } = useToast();
  const router = useRouter();

  const { getAllCountries, getCountryStates, getStateCitys } = useLocation();

  const countries = getAllCountries();

  const form = useForm<HotelAddSchemaType>({
    resolver: zodResolver(HotelAddSchema),
    defaultValues: hotel || {
      title: "",
      description: "",
      country: "",
      city: "",
      state: "",
      image: "",
      locationDescription: "",
      gym: false,
      spa: false,
      laundry: false,
      restaurant: false,
      bar: false,
      swimmingPool: false,
      freeWifi: false,
      freeParking: false,
      bikeRental: false,
      movieNight: false,
      coffeeShop: false,
    },
  });

  useEffect(() => {
    if (typeof image === "string") {
      form.setValue("image", image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image]);

  useEffect(() => {
    const selectedCountry = form.watch("country");
    const countryStates = getCountryStates(selectedCountry);
    if (countryStates) {
      setStates(countryStates);
    }
  }, [form.watch("country")]);

  useEffect(() => {
    const selectedCountry = form.watch("country");
    const selectedState = form.watch("state");
    const selectedCities = getStateCitys(selectedCountry, selectedState);

    // @ts-ignore
    if (selectedCities) {
      setCities(selectedCities);
    }
  }, [form.watch("country"), form.watch("state")]);

  const onSubmit = async (values: HotelAddSchemaType) => {
    if (hotel) {
      //update
      await axios
        .patch(`/api/hotel/${hotel.id}`, values)
        .then((res) => {
          toast({
            variant: "success",
            title: "Success",
            description: "🎉 Hotel Edited Succsessfully",
          });
          router.push(`/hotel/${res.data.id}`);
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong",
          });
        });
    } else {
      await axios
        .post("/api/hotel", values)
        .then((res) => {
          toast({
            variant: "success",
            title: "Success",
            description: "🎉 Hotel Created",
          });
          router.push(`/hotel/${res.data.id}`);
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong",
          });
        });
    }
  };

  const handleImageDelete = async (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf("/") + 1);

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          toast({
            variant: "default",
            title: " Deleted",
            description: "📌 Image has been deleted",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast({
          variant: "destructive",
          title: "Error Deleting Image",
          description: "Image has not been deleted",
        });
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };
  console.log(hotel, "sajjad");
  const handleDeleteButton = async (hotel: HotelWithRooms) => {
    setHotelIsDeleting(true);
    const imageKey = hotel.image.substring(hotel.image.lastIndexOf("/") + 1);
    try {
      await axios.post("/api/uploadthing/delete", { imageKey });
      await axios.delete(`/api/hotel/${hotel.id}`);

      setHotelIsDeleting(false);
      toast({
        variant: "success",
        title: "Success",
        description: "Hotel has been deleted",
      });

      router.push(`/hotel/new`);
    } catch (err) {
      console.log(err);

      toast({
        variant: "destructive",
        title: "Error ",
        description: `Hotel has not been deleted ${err}`,
      });
    }
  };

  const handleDialogOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h3 className="text-lg font-semibold">
            {hotel ? "Update your hotel" : "Describe your hotel"}
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-1 flex-col gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Title *</FormLabel>

                    <FormControl>
                      <Input placeholder="Beatch Hotel..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a title for your hotel
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Description *</FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Beatch Hotel is parked with many awesome amunities..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a title for your hotel
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Checked Box */}

              <div>
                <FormLabel>Choose Amenities</FormLabel>

                <FormDescription>
                  Choose amenities fit in your hotel
                </FormDescription>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <CheckboxGroup
                    label="Gym"
                    name="gym"
                    control={form.control}
                  />
                  <CheckboxGroup
                    label="Spa"
                    name="spa"
                    control={form.control}
                  />
                  <CheckboxGroup
                    label="Laundry"
                    name="laundry"
                    control={form.control}
                  />
                  <CheckboxGroup
                    label="Restaurant"
                    name="restaurant"
                    control={form.control}
                  />
                  <CheckboxGroup
                    label="Bar"
                    name="bar"
                    control={form.control}
                  />
                  <CheckboxGroup
                    label="Swimming Pool"
                    name="swimmingPool"
                    control={form.control}
                  />
                  <CheckboxGroup
                    label="Free Wifi"
                    name="freeWifi"
                    control={form.control}
                  />
                  <CheckboxGroup
                    label="Free Parking"
                    name="freeParking"
                    control={form.control}
                  />
                  <CheckboxGroup
                    label="Bike Rental"
                    name="bikeRental"
                    control={form.control}
                  />
                  <CheckboxGroup
                    label="Movie Night"
                    name="movieNight"
                    control={form.control}
                  />
                  <CheckboxGroup
                    label="Coffee Shop"
                    name="coffeeShop"
                    control={form.control}
                  />
                </div>
                {/*  */}
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel>Upload Image *</FormLabel>
                    <FormDescription>
                      Upload an image of your Room
                    </FormDescription>

                    <FormControl className="px-5">
                      {image ? (
                        <>
                          <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px]  mt-4">
                            <Image
                              src={image}
                              alt="hotel-image"
                              className="object-contain"
                              width={400}
                              height={400}
                            />
                            <Button
                              onClick={() => handleImageDelete(image)}
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="absolute right-[-12px] top-0"
                            >
                              {imageIsDeleting ? <Loader2 /> : <XCircle />}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col items-center justify-center max-w-[4000px] rounded mt-4 p-12 border-2 border-dotted ">
                            <UploadButton
                              endpoint="imageUploader"
                              onClientUploadComplete={(res) => {
                                console.log("Files: ", res);
                                setImage(res[0].url);
                                toast({
                                  variant: "default",
                                  title: "Image Uploaded",
                                  description: "Image has been uploaded",
                                });
                              }}
                              onUploadError={(error: Error) => {
                                console.log("upload", error);
                                toast({
                                  variant: "destructive",
                                  title: "Erorr Uploading Image",
                                  description: "Image has not been uploaded",
                                });
                              }}
                            />
                          </div>
                        </>
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-1 flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Country *</FormLabel>
                      <FormDescription>
                        Select your hotel country
                      </FormDescription>
                      <Select
                        disabled={form.formState.isSubmitting}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a country"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select State *</FormLabel>
                      <FormDescription>Select your hotel State</FormDescription>
                      <Select
                        disabled={
                          form.formState.isSubmitting || states.length < 1
                        }
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a State"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem
                              key={state.isoCode}
                              value={state.isoCode}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              {/*  */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select city *</FormLabel>
                    <FormDescription>Select your hotel city</FormDescription>
                    <Select
                      disabled={
                        form.formState.isSubmitting || cities.length < 1
                      }
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a city"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city, i) => (
                          <SelectItem key={i + 1} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Address *</FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Beatch Hotel is Location details..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a Address for your hotel
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <>
                {hotel && !hotel.rooms?.length && (
                  <Alert className="bg-indigo-500  text-white ">
                    <TerminalIcon className="w-4 h-4 stroke-white" />
                    <AlertTitle>One Last Step</AlertTitle>
                    <AlertDescription>
                      Your Hotel Created Successfully ✨
                      <div className="">
                        Please add some room to complete your hotel setup
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </>
              <div className="flex justify-between gap-5 flex-wrap">
                {hotel ? (
                  <>
                    <Button2
                      isLoading={form.formState.isSubmitting}
                      type="submit"
                    >
                      <Edit className="w-5 h-5 mr-3" /> Update{" "}
                    </Button2>
                    {/*  */}
                    <Button2>
                      <EyeIcon className="w-5 h-5 mr-3" /> View{" "}
                    </Button2>
                    {/*  */}
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger>
                        <Button
                          type="button"
                          className="bg-indigo-500 hover:bg-indigo-300 text-white hover:text-gray-900"
                        >
                          <PlusIcon className="w-5 h-5 mr-3" />
                          Add Room
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[900px] w-[90%]">
                        <DialogHeader className="px-2">
                          <DialogTitle className="text-center">
                            Add your hotel rooms
                          </DialogTitle>
                          <DialogDescription>
                            <AddRoom
                              hotel={hotel}
                              handleDialogOpen={handleDialogOpen}
                            />
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    {/*  */}
                    <Button2
                      variant="destructive"
                      isLoading={hotelIsDeleting}
                      onClick={() => handleDeleteButton(hotel)}
                    >
                      <Trash2 className="w-5 h-5 mr-3" /> Delete{" "}
                    </Button2>
                  </>
                ) : (
                  <>
                    <Button2
                      variant="outline"
                      isLoading={form.formState.isSubmitting}
                      type="submit"
                    >
                      <Edit3 className="w-5 h-5 mr-3" /> Submit{" "}
                    </Button2>
                  </>
                )}
              </div>
              <Separator />
              {hotel && !!hotel?.rooms?.length && (
                <>
                  <h3 className="text-lg font-semibold my-4">Hotel Rooms</h3>

                  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                    {hotel?.rooms.map((room) => (
                      <RoomCard key={room?.id} hotel={hotel} room={room} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddHotelForm;
