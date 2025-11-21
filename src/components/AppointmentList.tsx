import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, X, Edit } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Appointment {
  id: string;
  provider: string;
  date: string;
  time: string;
  reason: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
}

const AppointmentList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      provider: "Dr. Sarah Johnson",
      date: "2024-02-15",
      time: "10:00 AM",
      reason: "Regular checkup",
      status: "approved",
    },
    {
      id: "2",
      provider: "Dr. Michael Chen",
      date: "2024-02-18",
      time: "2:30 PM",
      reason: "Follow-up consultation",
      status: "pending",
    },
  ]);

  const [cancelDialog, setCancelDialog] = useState<string | null>(null);

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" as const } : apt
      )
    );
    toast.success("Appointment cancelled successfully");
    setCancelDialog(null);
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

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>
            <Calendar className="w-5 h-5 inline mr-2" />
            My Appointments
          </CardTitle>
          <CardDescription>View and manage your upcoming appointments</CardDescription>
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
                    <div className="font-semibold">{appointment.provider}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {appointment.reason}
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {appointment.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {appointment.time}
                  </div>
                </div>

                {(appointment.status === "pending" || appointment.status === "approved") && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => toast.info("Reschedule functionality")}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Reschedule
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                      onClick={() => setCancelDialog(appointment.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!cancelDialog} onOpenChange={() => setCancelDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => cancelDialog && handleCancelAppointment(cancelDialog)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Cancel Appointment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AppointmentList;
