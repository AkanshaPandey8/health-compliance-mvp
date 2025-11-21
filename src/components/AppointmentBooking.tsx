import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

interface Provider {
  id: string;
  name: string;
  specialization: string;
}

const AppointmentBooking = () => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("30");

  const providers: Provider[] = [
    { id: "1", name: "Dr. Sarah Johnson", specialization: "Cardiologist" },
    { id: "2", name: "Dr. Michael Chen", specialization: "General Practitioner" },
    { id: "3", name: "Dr. Emily Rodriguez", specialization: "Pediatrician" },
  ];

  const handleBookAppointment = () => {
    if (!selectedProvider || !appointmentDate || !appointmentTime || !reason) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate booking
    toast.success("Appointment booked successfully! Awaiting provider approval.");
    
    // Reset form
    setSelectedProvider("");
    setAppointmentDate("");
    setAppointmentTime("");
    setReason("");
    setDuration("30");
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>
          <Calendar className="w-5 h-5 inline mr-2" />
          Book New Appointment
        </CardTitle>
        <CardDescription>Schedule an appointment with a healthcare provider</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="provider">Select Provider</Label>
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger id="provider">
              <SelectValue placeholder="Choose a provider" />
            </SelectTrigger>
            <SelectContent>
              {providers.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.name} - {provider.specialization}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger id="duration">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Visit</Label>
          <Textarea
            id="reason"
            placeholder="Describe your symptoms or reason for the appointment"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
          />
        </div>

        <Button onClick={handleBookAppointment} className="w-full">
          <Clock className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
      </CardContent>
    </Card>
  );
};

export default AppointmentBooking;
