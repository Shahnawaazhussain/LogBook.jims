import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Room } from "../../types";
import { Users, MapPin, Wifi, MonitorPlay, Plug, ChevronRight } from "lucide-react";

interface SearchRoomsProps {
  rooms: Room[];
  onRoomSelect: (room: Room) => void;
}

export function SearchRooms({ rooms, onRoomSelect }: SearchRoomsProps) {
  const [capacity, setCapacity] = useState([20]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const allFacilities = ["Wi-Fi", "Smart Board", "Extension Sockets", "Projector", "Air Conditioning"];

  const toggleFacility = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  const filteredRooms = rooms.filter((room) => {
    const meetsCapacity = room.capacity >= capacity[0];
    const meetsFacilities =
      selectedFacilities.length === 0 ||
      selectedFacilities.every((f) => room.facilities.includes(f));
    return meetsCapacity && meetsFacilities && room.isActive;
  });

  const getFacilityIcon = (facility: string) => {
    switch (facility) {
      case "Wi-Fi":
        return <Wifi className="h-4 w-4" />;
      case "Smart Board":
        return <MonitorPlay className="h-4 w-4" />;
      case "Extension Sockets":
        return <Plug className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Search Rooms</h1>
        <p className="text-muted-foreground">
          Find and book the perfect room for your needs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Seating Capacity (Min: {capacity[0]})</Label>
                <Slider
                  value={capacity}
                  onValueChange={setCapacity}
                  min={10}
                  max={300}
                  step={10}
                />
              </div>

              <div className="space-y-3">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-3">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Facilities</Label>
                <div className="space-y-2">
                  {allFacilities.map((facility) => (
                    <div key={facility} className="flex items-center space-x-2">
                      <Checkbox
                        id={facility}
                        checked={selectedFacilities.includes(facility)}
                        onCheckedChange={() => toggleFacility(facility)}
                      />
                      <label
                        htmlFor={facility}
                        className="text-sm cursor-pointer"
                      >
                        {facility}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCapacity([20]);
                  setSelectedFacilities([]);
                  setSelectedDate("");
                  setSelectedTime("");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Room Results */}
        <div className="lg:col-span-3">
          <div className="mb-4">
            <p className="text-muted-foreground">
              {filteredRooms.length} room{filteredRooms.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRooms.map((room) => (
              <Card
                key={room.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onRoomSelect(room)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {room.building} • Floor {room.floor}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Capacity: {room.capacity} seats</span>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Facilities:</p>
                    <div className="flex flex-wrap gap-2">
                      {room.facilities.map((facility) => (
                        <span
                          key={facility}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs"
                        >
                          {getFacilityIcon(facility)}
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRooms.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  No rooms match your current filters. Try adjusting your search criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
