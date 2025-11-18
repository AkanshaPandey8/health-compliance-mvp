import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Droplet, Moon, LogOut, Users } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  email: string;
  goals: {
    date: string;
    steps: number;
    sleep: number;
    water: number;
  }[];
}

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [patients] = useState<Patient[]>([
    {
      id: "1",
      name: "Jane Smith",
      email: "jane@example.com",
      goals: [
        { date: "2024-01-15", steps: 12000, sleep: 8, water: 9 },
        { date: "2024-01-14", steps: 9500, sleep: 7, water: 8 },
      ],
    },
    {
      id: "2",
      name: "Bob Johnson",
      email: "bob@example.com",
      goals: [
        { date: "2024-01-15", steps: 7000, sleep: 6.5, water: 6 },
      ],
    },
  ]);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Provider Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Patient List */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>
                <Users className="w-5 h-5 inline mr-2" />
                All Patients
              </CardTitle>
              <CardDescription>Select a patient to view their goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`w-full p-4 text-left border rounded-lg transition-colors ${
                      selectedPatient?.id === patient.id
                        ? "bg-medical-blue-light border-primary"
                        : "bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className="font-semibold">{patient.name}</div>
                    <div className="text-sm text-muted-foreground">{patient.email}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {patient.goals.length} goals tracked
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patient Goals */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Patient Goals</CardTitle>
              <CardDescription>
                {selectedPatient
                  ? `Viewing goals for ${selectedPatient.name}`
                  : "Select a patient to view their goals"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedPatient ? (
                <div className="space-y-4">
                  {selectedPatient.goals.map((goal, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg bg-muted/30"
                    >
                      <div className="font-medium mb-3">{goal.date}</div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <Activity className="w-4 h-4 text-primary inline mr-1" />
                          <div className="font-semibold">{goal.steps}</div>
                          <div className="text-muted-foreground">steps</div>
                        </div>
                        <div>
                          <Moon className="w-4 h-4 text-secondary inline mr-1" />
                          <div className="font-semibold">{goal.sleep}</div>
                          <div className="text-muted-foreground">hours</div>
                        </div>
                        <div>
                          <Droplet className="w-4 h-4 text-primary inline mr-1" />
                          <div className="font-semibold">{goal.water}</div>
                          <div className="text-muted-foreground">glasses</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select a patient from the list to view their health goals</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
