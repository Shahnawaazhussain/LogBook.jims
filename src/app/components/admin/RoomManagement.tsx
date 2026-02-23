import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Room } from "../../types";
import { Edit, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";

interface RoomManagementProps {
  rooms: Room[];
  onAddRoom: (room: Omit<Room, "id">) => void;
  onEditRoom: (id: string, room: Partial<Room>) => void;
  onToggleRoom: (id: string) => void;
}

export function RoomManagement({
  rooms,
  onAddRoom,
  onEditRoom,
  onToggleRoom,
}: RoomManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [facilities, setFacilities] = useState<string[]>([]);

  const allFacilities = [
    "Wi-Fi",
    "Smart Board",
    "Extension Sockets",
    "Projector",
    "Air Conditioning",
    "Audio System",
    "Video Conferencing",
  ];

  const resetForm = () => {
    setName("");
    setCapacity("");
    setBuilding("");
    setFloor("");
    setFacilities([]);
  };

  const handleAddRoom = () => {
    if (!name || !capacity || !building || !floor) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newRoom: Omit<Room, "id"> = {
      name,
      capacity: parseInt(capacity),
      building,
      floor: parseInt(floor),
      facilities,
      isActive: true,
    };

    onAddRoom(newRoom);
    toast.success("Room added successfully");
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditClick = (room: Room) => {
    setEditingRoom(room);
    setName(room.name);
    setCapacity(room.capacity.toString());
    setBuilding(room.building);
    setFloor(room.floor.toString());
    setFacilities(room.facilities);
    setIsEditDialogOpen(true);
  };

  const handleEditRoom = () => {
    if (!editingRoom || !name || !capacity || !building || !floor) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedRoom: Partial<Room> = {
      name,
      capacity: parseInt(capacity),
      building,
      floor: parseInt(floor),
      facilities,
    };

    onEditRoom(editingRoom.id, updatedRoom);
    toast.success("Room updated successfully");
    setIsEditDialogOpen(false);
    resetForm();
    setEditingRoom(null);
  };

  const toggleFacility = (facility: string) => {
    setFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Room Management</h1>
          <p className="text-muted-foreground">
            Manage all rooms and their availability
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Rooms ({rooms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Building</TableHead>
                  <TableHead>Floor</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Facilities</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.id}</TableCell>
                    <TableCell>{room.name}</TableCell>
                    <TableCell>{room.building}</TableCell>
                    <TableCell>{room.floor}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {room.facilities.slice(0, 2).map((facility) => (
                          <span
                            key={facility}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted"
                          >
                            {facility}
                          </span>
                        ))}
                        {room.facilities.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{room.facilities.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {room.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactive
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(room)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onToggleRoom(room.id)}
                        >
                          {room.isActive ? (
                            <ToggleRight className="h-4 w-4" />
                          ) : (
                            <ToggleLeft className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Room Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Room</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new room to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Room Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Computer Lab 1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity *</Label>
              <Input
                id="capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="e.g., 60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="building">Building *</Label>
              <Input
                id="building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                placeholder="e.g., Engineering Block A"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="floor">Floor *</Label>
              <Input
                id="floor"
                type="number"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="e.g., 2"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Facilities</Label>
              <div className="grid grid-cols-2 gap-2">
                {allFacilities.map((facility) => (
                  <div key={facility} className="flex items-center space-x-2">
                    <Checkbox
                      id={`add-${facility}`}
                      checked={facilities.includes(facility)}
                      onCheckedChange={() => toggleFacility(facility)}
                    />
                    <label
                      htmlFor={`add-${facility}`}
                      className="text-sm cursor-pointer"
                    >
                      {facility}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRoom}>Add Room</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Room Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Room</DialogTitle>
            <DialogDescription>
              Update the room details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Room Name *</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-capacity">Capacity *</Label>
              <Input
                id="edit-capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-building">Building *</Label>
              <Input
                id="edit-building"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-floor">Floor *</Label>
              <Input
                id="edit-floor"
                type="number"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Facilities</Label>
              <div className="grid grid-cols-2 gap-2">
                {allFacilities.map((facility) => (
                  <div key={facility} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${facility}`}
                      checked={facilities.includes(facility)}
                      onCheckedChange={() => toggleFacility(facility)}
                    />
                    <label
                      htmlFor={`edit-${facility}`}
                      className="text-sm cursor-pointer"
                    >
                      {facility}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditRoom}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
