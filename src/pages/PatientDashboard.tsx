import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Activity, Droplet, Moon, LogOut } from "lucide-react";
import AppointmentBooking from "@/components/AppointmentBooking";
import AppointmentList from "@/components/AppointmentList";

interface Goal {
  id: string;
  date: string;
  steps: number;
  sleep: number;
  water: number;
}

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      date: "2024-01-15",
      steps: 8000,
      sleep: 7.5,
      water: 8,
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    steps: "",
    sleep: "",
    water: "",
  });

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const goal: Goal = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      steps: parseInt(newGoal.steps),
      sleep: parseFloat(newGoal.sleep),
      water: parseInt(newGoal.water),
    };
    setGoals([goal, ...goals]);
    setNewGoal({ steps: "", sleep: "", water: "" });
    toast.success("Daily goal added successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Patient Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="goals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="goals">Daily Goals</TabsTrigger>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="book">Book Appointment</TabsTrigger>
          </TabsList>

          <TabsContent value="goals" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Add Daily Goals</CardTitle>
                <CardDescription>Track your daily health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddGoal} className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="steps">
                        <Activity className="w-4 h-4 inline mr-2" />
                        Steps
                      </Label>
                      <Input
                        id="steps"
                        type="number"
                        placeholder="10000"
                        value={newGoal.steps}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, steps: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sleep">
                        <Moon className="w-4 h-4 inline mr-2" />
                        Sleep (hours)
                      </Label>
                      <Input
                        id="sleep"
                        type="number"
                        step="0.5"
                        placeholder="8"
                        value={newGoal.sleep}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, sleep: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="water">
                        <Droplet className="w-4 h-4 inline mr-2" />
                        Water (glasses)
                      </Label>
                      <Input
                        id="water"
                        type="number"
                        placeholder="8"
                        value={newGoal.water}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, water: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Add Goal
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Your Goal History</CardTitle>
                <CardDescription>View all your tracked goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div
                      key={goal.id}
                      className="p-4 border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-medium">{goal.date}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <Activity className="w-4 h-4 text-primary inline mr-1" />
                          <span className="font-semibold">{goal.steps}</span> steps
                        </div>
                        <div>
                          <Moon className="w-4 h-4 text-secondary inline mr-1" />
                          <span className="font-semibold">{goal.sleep}</span> hrs
                        </div>
                        <div>
                          <Droplet className="w-4 h-4 text-primary inline mr-1" />
                          <span className="font-semibold">{goal.water}</span> glasses
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentList />
          </TabsContent>

          <TabsContent value="book">
            <AppointmentBooking />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PatientDashboard;
