import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Room, BookingRequest } from "../../types";
import { Users, MapPin, ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

interface RoomDetailsProps {
  room: Room;
  onBack: () => void;
  onSubmitBooking: (booking: Omit<BookingRequest, "id" | "createdAt">) => void;
  currentUserId: string;
  currentUserName: string;
}

export function RoomDetails({
  room,
  onBack,
  onSubmitBooking,
  currentUserId,
  currentUserName,
}: RoomDetailsProps) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !startTime || !endTime || !purpose.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }

    const booking: Omit<BookingRequest, "id" | "createdAt"> = {
      roomId: room.id,
      requesterId: currentUserId,
      requesterName: currentUserName,
      date,
      startTime,
      endTime,
      purpose,
      status: "pending",
    };

    onSubmitBooking(booking);
    toast.success("Booking request submitted successfully!");

    // Reset form
    setDate("");
    setStartTime("");
    setEndTime("");
    setPurpose("");
  };

  // Generate time slots for calendar view
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Button>
        <h1 className="text-3xl mb-2">{room.name}</h1>
        <p className="text-muted-foreground">
          <MapPin className="h-4 w-4 inline mr-1" />
          {room.building} • Floor {room.floor}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Room Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Room Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="font-medium">Capacity</p>
                  <p className="text-sm text-muted-foreground">
                    {room.capacity} seats
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium mb-2">Available Facilities</p>
                <div className="flex flex-wrap gap-2">
                  {room.facilities.map((facility) => (
                    <span
                      key={facility}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Availability Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Sample time slots for today. Select your preferred time below.
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot}
                      className="p-2 border rounded-md text-center text-sm bg-green-50 border-green-200 text-green-700"
                    >
                      {slot}
                      <div className="text-xs text-green-600">Available</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Request Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose of Booking</Label>
                  <Textarea
                    id="purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Describe the purpose of your booking..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
