import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, CheckCircle, Clock, XCircle, Search } from "lucide-react";
import { BookingRequest } from "../../types";

interface RequesterDashboardProps {
  userBookings: BookingRequest[];
  onNavigate: (page: string) => void;
}

export function RequesterDashboard({
  userBookings,
  onNavigate,
}: RequesterDashboardProps) {
  const totalRequests = userBookings.length;
  const pendingRequests = userBookings.filter((b) => b.status === "pending").length;
  const approvedRequests = userBookings.filter((b) => b.status === "approved").length;
  const rejectedRequests = userBookings.filter((b) => b.status === "rejected").length;

  const stats = [
    {
      title: "Total Requests",
      value: totalRequests,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending",
      value: pendingRequests,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Approved",
      value: approvedRequests,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Rejected",
      value: rejectedRequests,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your booking requests.
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
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={() => onNavigate("search")}
            className="w-full justify-start"
            size="lg"
          >
            <Search className="mr-2 h-5 w-5" />
            Search & Book Rooms
          </Button>
          <Button
            onClick={() => onNavigate("bookings")}
            variant="outline"
            className="w-full justify-start"
            size="lg"
          >
            <Calendar className="mr-2 h-5 w-5" />
            View My Bookings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {userBookings.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No booking requests yet. Start by searching for available rooms.
            </p>
          ) : (
            <div className="space-y-3">
              {userBookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{booking.purpose}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(booking.date).toLocaleDateString()} •{" "}
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                  <div>
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
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
