import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { BookingRequest } from "../../types";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { getRoomById } from "../../mockData";
import { toast } from "sonner";

interface BookingRequestsProps {
  bookings: BookingRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string, remarks: string) => void;
}

export function BookingRequests({
  bookings,
  onApprove,
  onReject,
}: BookingRequestsProps) {
  const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const handleApprove = (id: string) => {
    onApprove(id);
    toast.success("Booking request approved");
  };

  const handleRejectClick = (booking: BookingRequest) => {
    setSelectedBooking(booking);
    setIsRejectDialogOpen(true);
  };

  const handleRejectConfirm = () => {
    if (!selectedBooking) return;

    if (!rejectRemarks.trim()) {
      toast.error("Please provide remarks for rejection");
      return;
    }

    onReject(selectedBooking.id, rejectRemarks);
    toast.success("Booking request rejected");
    setIsRejectDialogOpen(false);
    setRejectRemarks("");
    setSelectedBooking(null);
  };

  const handleViewDetails = (booking: BookingRequest) => {
    setSelectedBooking(booking);
    setIsDetailsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Booking Requests</h1>
        <p className="text-muted-foreground">
          Review and manage all room booking requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No booking requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((booking) => {
                    const room = getRoomById(booking.roomId);
                    return (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>{booking.requesterName}</TableCell>
                        <TableCell>{room?.name}</TableCell>
                        <TableCell>
                          {new Date(booking.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {booking.startTime} - {booking.endTime}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {booking.purpose}
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(booking)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {booking.status === "pending" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleApprove(booking.id)}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRejectClick(booking)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Booking Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this booking request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="remarks">Rejection Remarks</Label>
              <Textarea
                id="remarks"
                value={rejectRemarks}
                onChange={(e) => setRejectRemarks(e.target.value)}
                placeholder="Enter reason for rejection..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsRejectDialogOpen(false);
                setRejectRemarks("");
              }}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectConfirm}>
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Request Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Request ID</Label>
                  <p className="font-medium">{selectedBooking.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Requester</Label>
                  <p className="font-medium">{selectedBooking.requesterName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Room</Label>
                  <p className="font-medium">{getRoomById(selectedBooking.roomId)?.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p className="font-medium">
                    {new Date(selectedBooking.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Time</Label>
                  <p className="font-medium">
                    {selectedBooking.startTime} - {selectedBooking.endTime}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Purpose</Label>
                <p className="font-medium mt-1">{selectedBooking.purpose}</p>
              </div>
              {selectedBooking.adminRemarks && (
                <div>
                  <Label className="text-muted-foreground">Admin Remarks</Label>
                  <p className="font-medium mt-1">{selectedBooking.adminRemarks}</p>
                </div>
              )}
              <div>
                <Label className="text-muted-foreground">Submitted At</Label>
                <p className="font-medium mt-1">
                  {new Date(selectedBooking.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
