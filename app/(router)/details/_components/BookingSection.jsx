import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";


import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import moment from "moment";

const BookingSection = ({ children, business }) => {
  
  function getPreviousDate() {
    const currentDate = new Date();
    // Subtract one day in milliseconds (24 * 60 * 60 * 1000)
    const previousDate = new Date(currentDate.getTime() - 86400000);
    return previousDate;
  }
  
 
  const prevDate = getPreviousDate();
  console.log (prevDate)
  const [date, setDate] = useState( Date());
  console.log(date)
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);
  const { data } = useSession();
 
  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    const prevDate = getPreviousDate();
  //  console.log("Previous Date:", prevDate.toISOString)
    }, [])

  useEffect(() => {
    date && businessBookedSlot();
  }, [date]);



const businessBookedSlot = () => {
    GlobalApi.businessBookedSlot(
      business.id,
      moment(date).format("DD-MM-YYYY")
    ).then((res) => {
      setBookedSlot(res.bookings);
    });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });    
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    GlobalApi.createNewBooking(
      business.id,
      moment(date).format("DD-MM-YYYY"),
      selectedTime,
      data.user.email,
      data.user.name
    ).then(
      (res) => {
        if (res) {
          setDate();
          setSelectedTime("");
          toast(" Appointment created successfully");
        }
      },
      (e) => {
        toast("error!!! Something is wrong! Please try again!!");
        console.log(e)
      }
    );
  };
  
    
  const isBooked = (time) => {
    return bookedSlot.find((item) => item.time === time);
   
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className=" h-22 mr-4 bg-neutral-950  overflow-hidden">
          <SheetHeader>
            <SheetTitle>Book a Service</SheetTitle>
            <SheetDescription>
              Select Date and Time slot to book an service
              <div className="flex flex-col gap-5 items-baseline">
                <h2 className="mt-5 font-bold">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border right-10"
                />
              </div>
              <h2 className="my-5 font-bold">Select Time Slot</h2>
              <div className="grid grid-cols-3 gap-3">
                {timeSlot.map((item, index) => (
                  <Button
                    key={index}
                    variant="outiline"
                    disabled={isBooked(item.time) || prevDate >= date } 
                    className={`border rounded-full p-2 px-3 hover:bg-primary hover:text-white ${
                      selectedTime == item.time && "bg-primary text-white"
                    }`}
                    onClick={() => setSelectedTime(item.time)}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button variant="destructive" className="">
                  Cancel
                </Button>

                <Button
                  disabled={!(selectedTime && date) || prevDate >= Date }
                  onClick={() => saveBooking()}
                >
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BookingSection;