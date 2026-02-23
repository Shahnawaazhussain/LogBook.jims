import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { RequesterNav } from "./components/layout/RequesterNav";
import { AdminSidebar } from "./components/layout/AdminSidebar";
import { RequesterDashboard } from "./components/requester/RequesterDashboard";
import { SearchRooms } from "./components/requester/SearchRooms";
import { RoomDetails } from "./components/requester/RoomDetails";
import { MyBookings } from "./components/requester/MyBookings";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { BookingRequests } from "./components/admin/BookingRequests";
import { RoomManagement } from "./components/admin/RoomManagement";
import { ScheduleView } from "./components/admin/ScheduleView";
import { UserRole, Room, BookingRequest } from "./types";
import { rooms as initialRooms, bookingRequests as initialBookings } from "./mockData";

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>("requester");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  // State management
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [bookings, setBookings] = useState<BookingRequest[]>(initialBookings);

  // Current user (mock)
  const currentUser = {
    id: currentRole === "requester" ? "U001" : "ADMIN",
    name: currentRole === "requester" ? "John Doe" : "Admin User",
    email: currentRole === "requester" ? "john.doe@college.edu" : "admin@college.edu",
    role: currentRole,
  };

  // Get user's bookings
  const userBookings = bookings.filter((b) => b.requesterId === currentUser.id);

  // Handlers
  const handleSwitchRole = () => {
    setCurrentRole((prev) => (prev === "requester" ? "admin" : "requester"));
    setCurrentPage(currentRole === "requester" ? "admin-dashboard" : "dashboard");
    setSelectedRoom(null);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedRoom(null);
  };

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setCurrentPage("room-details");
  };

  const handleSubmitBooking = (booking: Omit<BookingRequest, "id" | "createdAt">) => {
    const newBooking: BookingRequest = {
      ...booking,
      id: `B${String(bookings.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
    };
    setBookings([...bookings, newBooking]);
  };

  const handleApproveBooking = (id: string) => {
    setBookings(
      bookings.map((b) =>
        b.id === id
          ? {
              ...b,
              status: "approved" as const,
              reviewedBy: currentUser.name,
              reviewedAt: new Date().toISOString(),
            }
          : b
      )
    );
  };

  const handleRejectBooking = (id: string, remarks: string) => {
    setBookings(
      bookings.map((b) =>
        b.id === id
          ? {
              ...b,
              status: "rejected" as const,
              adminRemarks: remarks,
              reviewedBy: currentUser.name,
              reviewedAt: new Date().toISOString(),
            }
          : b
      )
    );
  };

  const handleAddRoom = (room: Omit<Room, "id">) => {
    const newRoom: Room = {
      ...room,
      id: `R${String(rooms.length + 1).padStart(3, "0")}`,
    };
    setRooms([...rooms, newRoom]);
  };

  const handleEditRoom = (id: string, updates: Partial<Room>) => {
    setRooms(rooms.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const handleToggleRoom = (id: string) => {
    setRooms(
      rooms.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  // Render content based on current page
  const renderContent = () => {
    if (currentRole === "requester") {
      switch (currentPage) {
        case "dashboard":
          return (
            <RequesterDashboard
              userBookings={userBookings}
              onNavigate={handleNavigate}
            />
          );
        case "search":
          return <SearchRooms rooms={rooms} onRoomSelect={handleRoomSelect} />;
        case "room-details":
          return selectedRoom ? (
            <RoomDetails
              room={selectedRoom}
              onBack={() => handleNavigate("search")}
              onSubmitBooking={handleSubmitBooking}
              currentUserId={currentUser.id}
              currentUserName={currentUser.name}
            />
          ) : null;
        case "bookings":
          return <MyBookings bookings={userBookings} />;
        default:
          return null;
      }
    } else {
      // Admin pages
      switch (currentPage) {
        case "admin-dashboard":
          return <AdminDashboard bookings={bookings} rooms={rooms} />;
        case "booking-requests":
          return (
            <BookingRequests
              bookings={bookings}
              onApprove={handleApproveBooking}
              onReject={handleRejectBooking}
            />
          );
        case "room-management":
          return (
            <RoomManagement
              rooms={rooms}
              onAddRoom={handleAddRoom}
              onEditRoom={handleEditRoom}
              onToggleRoom={handleToggleRoom}
            />
          );
        case "schedule":
          return <ScheduleView bookings={bookings} rooms={rooms} />;
        default:
          return null;
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      {currentRole === "requester" ? (
        <>
          <RequesterNav
            currentPage={currentPage}
            onNavigate={handleNavigate}
            userName={currentUser.name}
            onSwitchRole={handleSwitchRole}
          />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </main>
        </>
      ) : (
        <div className="flex">
          <AdminSidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            userName={currentUser.name}
            onSwitchRole={handleSwitchRole}
          />
          <main className="flex-1 p-8">{renderContent()}</main>
        </div>
      )}
    </div>
  );
}
