import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Users, Shield, TrendingUp, Heart, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Healthcare Compliance Tracking System
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Empowering patients and providers with seamless health goal tracking and compliance monitoring
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/auth?role=patient")}
                className="text-lg px-8 py-6"
              >
                Patient Portal
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth?role=provider")}
                className="text-lg px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                Provider Portal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <Activity className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Daily Goal Tracking</h3>
              <p className="text-muted-foreground">
                Monitor steps, sleep, water intake, and more with intuitive tracking tools
              </p>
            </Card>
            <Card className="p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <Users className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Provider Dashboard</h3>
              <p className="text-muted-foreground">
                Healthcare providers can monitor multiple patients and their compliance metrics
              </p>
            </Card>
            <Card className="p-6 shadow-card hover:shadow-card-hover transition-shadow">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure & Compliant</h3>
              <p className="text-muted-foreground">
                HIPAA-ready infrastructure ensuring your health data stays private and secure
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <TrendingUp className="w-10 h-10 text-secondary mx-auto mb-3" />
              <div className="text-4xl font-bold text-foreground mb-2">95%</div>
              <div className="text-muted-foreground">Compliance Rate</div>
            </div>
            <div>
              <Heart className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-4xl font-bold text-foreground mb-2">10k+</div>
              <div className="text-muted-foreground">Active Patients</div>
            </div>
            <div>
              <Clock className="w-10 h-10 text-secondary mx-auto mb-3" />
              <div className="text-4xl font-bold text-foreground mb-2">24/7</div>
              <div className="text-muted-foreground">Access & Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of patients and providers using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/health-info")}
              variant="outline"
              className="text-lg px-8 py-6"
            >
              Learn More
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2024 Healthcare Compliance System. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <button
              onClick={() => navigate("/privacy-policy")}
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate("/health-info")}
              className="hover:text-foreground transition-colors"
            >
              Health Information
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
