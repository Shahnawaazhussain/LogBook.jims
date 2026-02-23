export type UserRole = "requester" | "admin";

export type BookingStatus = "pending" | "approved" | "rejected";

export interface Room {
  id: string;
  name: string;
  capacity: number;
  facilities: string[];
  building: string;
  floor: number;
  isActive: boolean;
}

export interface BookingRequest {
  id: string;
  roomId: string;
  requesterId: string;
  requesterName: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: BookingStatus;
  createdAt: string;
  adminRemarks?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  bookingId?: string;
}
