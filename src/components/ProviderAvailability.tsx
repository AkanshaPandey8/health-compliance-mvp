import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface AvailabilitySlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

const ProviderAvailability = () => {
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([
    { id: "1", day: "Monday", startTime: "09:00", endTime: "17:00" },
    { id: "2", day: "Wednesday", startTime: "09:00", endTime: "17:00" },
    { id: "3", day: "Friday", startTime: "10:00", endTime: "16:00" },
  ]);

  const [newDay, setNewDay] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleAddSlot = () => {
    if (!newDay || !newStartTime || !newEndTime) {
      toast.error("Please fill in all fields");
      return;
    }

    const newSlot: AvailabilitySlot = {
      id: Date.now().toString(),
      day: newDay,
      startTime: newStartTime,
      endTime: newEndTime,
    };

    setAvailabilitySlots([...availabilitySlots, newSlot]);
    toast.success("Availability slot added");

    // Reset form
    setNewDay("");
    setNewStartTime("");
    setNewEndTime("");
  };

  const handleDeleteSlot = (id: string) => {
    setAvailabilitySlots(availabilitySlots.filter((slot) => slot.id !== id));
    toast.success("Availability slot removed");
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>
          <Clock className="w-5 h-5 inline mr-2" />
          Set Availability
        </CardTitle>
        <CardDescription>Manage your weekly schedule for patient appointments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Availability */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Current Availability</h3>
          {availabilitySlots.length === 0 ? (
            <p className="text-sm text-muted-foreground">No availability slots set</p>
          ) : (
            availabilitySlots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
              >
                <div className="flex-1">
                  <div className="font-medium">{slot.day}</div>
                  <div className="text-sm text-muted-foreground">
                    {slot.startTime} - {slot.endTime}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteSlot(slot.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Add New Slot */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-semibold text-sm">Add New Slot</h3>
          
          <div className="space-y-2">
            <Label htmlFor="day">Day of Week</Label>
            <Select value={newDay} onValueChange={setNewDay}>
              <SelectTrigger id="day">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {daysOfWeek.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleAddSlot} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Availability Slot
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderAvailability;
