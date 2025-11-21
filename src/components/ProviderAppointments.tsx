import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Check, X, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Appointment {
  id: string;
  patient: string;
  patientEmail: string;
  date: string;
  time: string;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
}

const ProviderAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patient: "Jane Smith",
      patientEmail: "jane@example.com",
      date: "2024-02-15",
      time: "10:00 AM",
      reason: "Regular checkup and blood pressure monitoring",
      status: "pending",
    },
    {
      id: "2",
      patient: "Bob Johnson",
      patientEmail: "bob@example.com",
      date: "2024-02-16",
      time: "2:30 PM",
      reason: "Follow-up for diabetes management",
      status: "approved",
    },
    {
      id: "3",
      patient: "Alice Williams",
      patientEmail: "alice@example.com",
      date: "2024-02-18",
      time: "11:00 AM",
      reason: "Initial consultation for persistent headaches",
      status: "pending",
    },
  ]);

  const [rejectDialog, setRejectDialog] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: "approved" as const } : apt
      )
    );
    toast.success("Appointment approved");
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    if (rejectDialog) {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === rejectDialog ? { ...apt, status: "rejected" as const } : apt
        )
      );
      toast.success("Appointment rejected");
    }

    setRejectDialog(null);
    setRejectionReason("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "cancelled":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default:
        return "";
    }
  };

  const pendingCount = appointments.filter((apt) => apt.status === "pending").length;

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              <Calendar className="w-5 h-5 inline mr-2" />
              Appointment Requests
            </span>
            {pendingCount > 0 && (
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                {pendingCount} pending
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Review and manage patient appointment requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold">{appointment.patient}</div>
                    <div className="text-sm text-muted-foreground">{appointment.patientEmail}</div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {appointment.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {appointment.time}
                  </div>
                </div>

                <div className="mb-3 p-2 bg-background/50 rounded text-sm">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <span>{appointment.reason}</span>
                  </div>
                </div>

                {appointment.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleApprove(appointment.id)}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => setRejectDialog(appointment.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!rejectDialog} onOpenChange={() => setRejectDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Appointment</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this appointment. The patient will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="rejection-reason">Reason for Rejection</Label>
            <Textarea
              id="rejection-reason"
              placeholder="e.g., Time slot no longer available, need more information, etc."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProviderAppointments;
