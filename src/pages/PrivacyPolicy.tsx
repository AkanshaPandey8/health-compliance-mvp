import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";

const PrivacyPolicy = () => {
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
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-6 h-6 mr-2 text-primary" />
                Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We are committed to protecting your health information. All data is encrypted both
                in transit and at rest using industry-standard encryption protocols. We follow
                HIPAA compliance guidelines to ensure your protected health information (PHI)
                remains secure.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-6 h-6 mr-2 text-secondary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Account information (username, email, role)</li>
                <li>Health metrics (steps, sleep, water intake)</li>
                <li>Profile information you choose to provide</li>
                <li>Usage data and analytics to improve our service</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-6 h-6 mr-2 text-primary" />
                How We Use Your Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To provide and maintain our service</li>
                <li>To enable healthcare providers to monitor patient compliance</li>
                <li>To generate health insights and summaries</li>
                <li>To improve our platform and user experience</li>
                <li>To communicate important updates and changes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-6 h-6 mr-2 text-secondary" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access your personal and health data</li>
                <li>Request corrections to your information</li>
                <li>Delete your account and associated data</li>
                <li>Export your health data</li>
                <li>Opt-out of non-essential communications</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Questions or Concerns?</h3>
          <p className="text-muted-foreground text-sm">
            If you have any questions about our privacy practices or wish to exercise your rights,
            please contact our privacy team at privacy@healthcompliance.com
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
