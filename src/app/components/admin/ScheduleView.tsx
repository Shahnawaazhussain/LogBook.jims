import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BookingRequest, Room } from "../../types";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { getRoomById } from "../../mockData";

interface ScheduleViewProps {
  bookings: BookingRequest[];
  rooms: Room[];
}

export function ScheduleView({ bookings, rooms }: ScheduleViewProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>("all");
  const [currentDate, setCurrentDate] = useState(new Date());

  const approvedBookings = bookings.filter((b) => b.status === "approved");

  // Filter bookings by selected room
  const filteredBookings =
    selectedRoom === "all"
      ? approvedBookings
      : approvedBookings.filter((b) => b.roomId === selectedRoom);

  // Generate calendar days for current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const getBookingsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateString = date.toISOString().split("T")[0];
    return filteredBookings.filter((b) => b.date === dateString);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Schedule View</h1>
        <p className="text-muted-foreground">
          View all approved bookings in a calendar format
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Select value={selectedRoom} onValueChange={setSelectedRoom}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select room" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rooms</SelectItem>
            {rooms.map((room) => (
              <SelectItem key={room.id} value={room.id}>
                {room.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 min-w-[200px] justify-center">
            <CalendarIcon className="h-4 w-4" />
            <span className="font-medium">{monthName}</span>
          </div>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-medium text-sm text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((date, index) => {
              const dayBookings = getBookingsForDate(date);
              return (
                <div
                  key={index}
                  className={`min-h-[100px] border rounded-lg p-2 ${
                    date
                      ? isToday(date)
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white hover:bg-muted/30"
                      : "bg-muted/20"
                  }`}
                >
                  {date && (
                    <>
                      <div className="font-medium text-sm mb-1">
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayBookings.slice(0, 2).map((booking) => {
                          const room = getRoomById(booking.roomId);
                          return (
                            <div
                              key={booking.id}
                              className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate"
                              title={`${room?.name} - ${booking.purpose}`}
                            >
                              <div className="font-medium truncate">
                                {booking.startTime}
                              </div>
                              <div className="truncate">{room?.name}</div>
                            </div>
                          );
                        })}
                        {dayBookings.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayBookings.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredBookings
              .filter((b) => new Date(b.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 10)
              .map((booking) => {
                const room = getRoomById(booking.roomId);
                return (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{room?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(booking.date).toLocaleDateString()} •{" "}
                        {booking.startTime} - {booking.endTime}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.requesterName} • {booking.purpose}
                      </p>
                    </div>
                  </div>
                );
              })}
            {filteredBookings.filter((b) => new Date(b.date) >= new Date()).length ===
              0 && (
              <p className="text-center text-muted-foreground py-8">
                No upcoming bookings
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
