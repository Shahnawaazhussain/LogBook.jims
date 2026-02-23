import { Button } from "../ui/button";
import { Calendar, Home, Search, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface RequesterNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userName: string;
  onSwitchRole: () => void;
}

export function RequesterNav({
  currentPage,
  onNavigate,
  userName,
  onSwitchRole,
}: RequesterNavProps) {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-xl">RoomBook</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <Button
                variant={currentPage === "dashboard" ? "default" : "ghost"}
                onClick={() => onNavigate("dashboard")}
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={currentPage === "search" ? "default" : "ghost"}
                onClick={() => onNavigate("search")}
              >
                <Search className="mr-2 h-4 w-4" />
                Search Rooms
              </Button>
              <Button
                variant={currentPage === "bookings" ? "default" : "ghost"}
                onClick={() => onNavigate("bookings")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                My Bookings
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden md:inline">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSwitchRole}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Switch to Admin View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
