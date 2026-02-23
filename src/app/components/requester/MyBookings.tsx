import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BookingRequest, Room } from "../../types";
import { Calendar, Clock, MapPin, AlertCircle } from "lucide-react";
import { getRoomById } from "../../mockData";

interface MyBookingsProps {
  bookings: BookingRequest[];
}

export function MyBookings({ bookings }: MyBookingsProps) {
  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const approvedBookings = bookings.filter((b) => b.status === "approved");
  const rejectedBookings = bookings.filter((b) => b.status === "rejected");

  const renderBookingCard = (booking: BookingRequest) => {
    const room = getRoomById(booking.roomId);
    if (!room) return null;

    return (
      <Card key={booking.id}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{room.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 inline mr-1" />
                {room.building} • Floor {room.floor}
              </p>
            </div>
            {booking.status === "pending" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending
              </span>
            )}
            {booking.status === "approved" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Approved
              </span>
            )}
            {booking.status === "rejected" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Rejected
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{new Date(booking.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
          </div>

          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              {booking.startTime} - {booking.endTime}
            </span>
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm font-medium mb-1">Purpose:</p>
            <p className="text-sm text-muted-foreground">{booking.purpose}</p>
          </div>

          {booking.status === "rejected" && booking.adminRemarks && (
            <div className="pt-2 border-t">
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900">Admin Remarks:</p>
                  <p className="text-sm text-red-700">{booking.adminRemarks}</p>
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground pt-2">
            Requested on: {new Date(booking.createdAt).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage all your booking requests
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All ({bookings.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({pendingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedBookings.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      You haven't made any booking requests yet.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              bookings.map(renderBookingCard)
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingBookings.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="py-12 text-center">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No pending booking requests.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              pendingBookings.map(renderBookingCard)
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approvedBookings.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No approved bookings yet.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              approvedBookings.map(renderBookingCard)
            )}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rejectedBookings.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No rejected bookings.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              rejectedBookings.map(renderBookingCard)
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
