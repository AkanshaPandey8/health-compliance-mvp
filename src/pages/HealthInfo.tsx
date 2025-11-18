import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Activity, Heart, Brain, Apple } from "lucide-react";

const HealthInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Health Information & Resources</h1>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-6 h-6 mr-2 text-primary" />
                Physical Activity Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Adults should aim for at least 150 minutes of moderate-intensity aerobic activity
                or 75 minutes of vigorous-intensity activity per week. This translates to
                approximately 7,000-10,000 steps per day for most adults.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-6 h-6 mr-2 text-secondary" />
                Sleep Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Most adults need 7-9 hours of quality sleep per night. Good sleep is essential for
                physical health, mental well-being, and overall quality of life. Maintain a
                consistent sleep schedule and create a relaxing bedtime routine.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-6 h-6 mr-2 text-primary" />
                Hydration Importance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Staying properly hydrated is crucial for maintaining body temperature, keeping
                joints lubricated, preventing infections, and keeping organs functioning properly.
                Aim for 8 glasses (64 ounces) of water daily, or more if you're physically active.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Apple className="w-6 h-6 mr-2 text-secondary" />
                Nutrition Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A balanced diet rich in fruits, vegetables, whole grains, lean proteins, and
                healthy fats supports overall health. Limit processed foods, added sugars, and
                excessive sodium. Remember: nutrition works hand-in-hand with physical activity and
                adequate sleep.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            This information is for educational purposes only and should not replace professional
            medical advice.
          </p>
          <Button onClick={() => navigate("/auth")}>Get Started with Tracking</Button>
        </div>
      </main>
    </div>
  );
};

export default HealthInfo;
