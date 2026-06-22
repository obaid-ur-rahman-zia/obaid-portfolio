"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Layers } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AdminThemeToggle } from "@/components/admin/AdminThemeToggle";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid credentials or API unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">Portfolio CRM</p>
            <p className="text-xs text-muted-foreground">Sign in to manage content</p>
          </div>
        </div>
        <AdminThemeToggle />
      </div>

      <Card className="w-full border-border/80 shadow-lg">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Use your admin credentials. Session stays saved in this browser.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="obaid107333@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
                </>
              ) : (
                "Sign in to CRM"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
