import { Room, BookingRequest, User } from "./types";

export const rooms: Room[] = [
  {
    id: "R001",
    name: "Computer Lab 1",
    capacity: 60,
    facilities: ["Wi-Fi", "Smart Board", "Extension Sockets", "Projector"],
    building: "Engineering Block A",
    floor: 2,
    isActive: true,
  },
  {
    id: "R002",
    name: "Seminar Hall",
    capacity: 120,
    facilities: ["Wi-Fi", "Smart Board", "Audio System", "Air Conditioning"],
    building: "Main Building",
    floor: 1,
    isActive: true,
  },
  {
    id: "R003",
    name: "Tutorial Room 201",
    capacity: 30,
    facilities: ["Wi-Fi", "Whiteboard", "Extension Sockets"],
    building: "Academic Block B",
    floor: 2,
    isActive: true,
  },
  {
    id: "R004",
    name: "Conference Room",
    capacity: 25,
    facilities: ["Wi-Fi", "Smart Board", "Video Conferencing", "Air Conditioning"],
    building: "Admin Block",
    floor: 3,
    isActive: true,
  },
  {
    id: "R005",
    name: "Physics Lab",
    capacity: 40,
    facilities: ["Wi-Fi", "Lab Equipment", "Extension Sockets"],
    building: "Science Block",
    floor: 1,
    isActive: true,
  },
  {
    id: "R006",
    name: "Library Study Room",
    capacity: 15,
    facilities: ["Wi-Fi", "Whiteboard", "Silent Zone"],
    building: "Library Building",
    floor: 2,
    isActive: true,
  },
  {
    id: "R007",
    name: "Auditorium",
    capacity: 300,
    facilities: ["Wi-Fi", "Audio System", "Projector", "Stage", "Air Conditioning"],
    building: "Main Building",
    floor: 1,
    isActive: true,
  },
  {
    id: "R008",
    name: "Design Studio",
    capacity: 35,
    facilities: ["Wi-Fi", "Smart Board", "Extension Sockets", "Display Monitors"],
    building: "Arts Block",
    floor: 2,
    isActive: true,
  },
];

export const bookingRequests: BookingRequest[] = [
  {
    id: "B001",
    roomId: "R001",
    requesterId: "U001",
    requesterName: "John Doe",
    date: "2026-02-10",
    startTime: "09:00",
    endTime: "11:00",
    purpose: "Database Management Workshop",
    status: "pending",
    createdAt: "2026-02-05T10:30:00Z",
  },
  {
    id: "B002",
    roomId: "R002",
    requesterId: "U002",
    requesterName: "Dr. Sarah Wilson",
    date: "2026-02-08",
    startTime: "14:00",
    endTime: "16:00",
    purpose: "Guest Lecture on AI and Ethics",
    status: "approved",
    createdAt: "2026-02-03T09:15:00Z",
    reviewedBy: "Admin User",
    reviewedAt: "2026-02-03T14:30:00Z",
  },
  {
    id: "B003",
    roomId: "R003",
    requesterId: "U001",
    requesterName: "John Doe",
    date: "2026-02-12",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "Project Discussion",
    status: "rejected",
    createdAt: "2026-02-04T11:20:00Z",
    adminRemarks: "Room already booked for department meeting",
    reviewedBy: "Admin User",
    reviewedAt: "2026-02-04T16:00:00Z",
  },
  {
    id: "B004",
    roomId: "R004",
    requesterId: "U003",
    requesterName: "Prof. Michael Chen",
    date: "2026-02-15",
    startTime: "13:00",
    endTime: "15:00",
    purpose: "Research Committee Meeting",
    status: "approved",
    createdAt: "2026-02-02T08:45:00Z",
    reviewedBy: "Admin User",
    reviewedAt: "2026-02-02T10:00:00Z",
  },
  {
    id: "B005",
    roomId: "R007",
    requesterId: "U004",
    requesterName: "Emily Rodriguez",
    date: "2026-02-20",
    startTime: "09:00",
    endTime: "12:00",
    purpose: "Annual Tech Fest Inauguration",
    status: "pending",
    createdAt: "2026-02-05T14:00:00Z",
  },
  {
    id: "B006",
    roomId: "R001",
    requesterId: "U001",
    requesterName: "John Doe",
    date: "2026-02-06",
    startTime: "14:00",
    endTime: "16:00",
    purpose: "Coding Competition Practice",
    status: "approved",
    createdAt: "2026-02-01T12:00:00Z",
    reviewedBy: "Admin User",
    reviewedAt: "2026-02-01T15:30:00Z",
  },
  {
    id: "B007",
    roomId: "R006",
    requesterId: "U005",
    requesterName: "Alex Thompson",
    date: "2026-02-14",
    startTime: "16:00",
    endTime: "18:00",
    purpose: "Group Study Session",
    status: "pending",
    createdAt: "2026-02-05T16:45:00Z",
  },
  {
    id: "B008",
    roomId: "R005",
    requesterId: "U002",
    requesterName: "Dr. Sarah Wilson",
    date: "2026-02-18",
    startTime: "10:00",
    endTime: "13:00",
    purpose: "Advanced Physics Experiment Demonstration",
    status: "approved",
    createdAt: "2026-02-04T09:00:00Z",
    reviewedBy: "Admin User",
    reviewedAt: "2026-02-04T11:00:00Z",
  },
];

export const users: User[] = [
  {
    id: "U001",
    name: "John Doe",
    email: "john.doe@college.edu",
    role: "requester",
  },
  {
    id: "U002",
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@college.edu",
    role: "requester",
  },
  {
    id: "ADMIN",
    name: "Admin User",
    email: "admin@college.edu",
    role: "admin",
  },
];

// Helper function to get room by id
export const getRoomById = (id: string): Room | undefined => {
  return rooms.find((room) => room.id === id);
};

// Helper function to get bookings for a specific user
export const getBookingsForUser = (userId: string): BookingRequest[] => {
  return bookingRequests.filter((booking) => booking.requesterId === userId);
};

// Helper function to get bookings by status
export const getBookingsByStatus = (status: string): BookingRequest[] => {
  return bookingRequests.filter((booking) => booking.status === status);
};
