import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookingRequest, Room } from "../../types";
import { Calendar, CheckCircle, Clock, DoorOpen } from "lucide-react";
import { getRoomById } from "../../mockData";

interface AdminDashboardProps {
  bookings: BookingRequest[];
  rooms: Room[];
}

export function AdminDashboard({ bookings, rooms }: AdminDashboardProps) {
  const pendingRequests = bookings.filter((b) => b.status === "pending").length;
  const approvedBookings = bookings.filter((b) => b.status === "approved").length;
  const activeRooms = rooms.filter((r) => r.isActive).length;
  const totalBookings = bookings.length;

  const stats = [
    {
      title: "Pending Requests",
      value: pendingRequests,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Approved Bookings",
      value: approvedBookings,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Rooms",
      value: activeRooms,
      icon: DoorOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Requests",
      value: totalBookings,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and oversee all room booking requests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Booking Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No booking requests yet
              </p>
            ) : (
              recentBookings.map((booking) => {
                const room = getRoomById(booking.roomId);
                return (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{booking.requesterName}</p>
                        {booking.status === "pending" && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                        {booking.status === "approved" && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Approved
                          </span>
                        )}
                        {booking.status === "rejected" && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Rejected
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {room?.name} • {new Date(booking.date).toLocaleDateString()} •{" "}
                        {booking.startTime} - {booking.endTime}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {booking.purpose}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
