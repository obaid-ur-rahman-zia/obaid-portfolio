"use client";

import { useEffect, useState } from "react";
import { adminGetProfile, adminUpdateProfile } from "@/lib/api";
import type { Profile } from "@/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetProfile()
      .then(setProfile)
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!profile) return <p className="text-muted-foreground">Could not load profile.</p>;

  const update = (key: keyof Profile, value: string | number | string[]) => {
    setProfile({ ...profile, [key]: value });
    setSaved(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <AdminPageHeader title="Profile" description="Edit your public bio and social links" />
      <Card>
        <CardHeader>
          <CardTitle>About & links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(["name", "title", "tagline", "email", "photo", "github", "linkedin", "whatsapp"] as const).map(
            (field) => (
              <div key={field} className="space-y-2">
                <Label className="capitalize">{field}</Label>
                <Input
                  value={(profile[field] as string) || ""}
                  onChange={(e) => update(field, e.target.value)}
                />
              </div>
            )
          )}
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea value={profile.bio} onChange={(e) => update("bio", e.target.value)} rows={5} />
          </div>
          {saved && (
            <Alert>
              <AlertDescription>Profile saved successfully.</AlertDescription>
            </Alert>
          )}
          <Button
            onClick={async () => {
              await adminUpdateProfile(profile);
              setSaved(true);
            }}
          >
            Save profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
