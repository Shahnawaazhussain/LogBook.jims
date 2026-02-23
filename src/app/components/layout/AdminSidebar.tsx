import { Button } from "../ui/button";
import {
  Calendar,
  LayoutDashboard,
  ListChecks,
  DoorOpen,
  CalendarDays,
  User,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userName: string;
  onSwitchRole: () => void;
}

export function AdminSidebar({
  currentPage,
  onNavigate,
  userName,
  onSwitchRole,
}: AdminSidebarProps) {
  const menuItems = [
    { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "booking-requests", label: "Booking Requests", icon: ListChecks },
    { id: "room-management", label: "Room Management", icon: DoorOpen },
    { id: "schedule", label: "Schedule View", icon: CalendarDays },
  ];

  return (
    <div className="w-64 bg-white border-r h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="font-semibold text-xl">RoomBook</span>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => onNavigate(item.id)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSwitchRole}>
              <LogOut className="mr-2 h-4 w-4" />
              Switch to Requester View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
