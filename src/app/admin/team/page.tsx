"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { adminGetTeam, adminUpdateTeam } from "@/lib/api";
import type { TeamMember } from "@/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CrmPanel } from "@/components/admin/crm/CrmPanel";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [saved, setSaved] = useState(false);

  const load = () => adminGetTeam().then(setTeam).catch(() => setTeam([]));

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!editing) return;
    await adminUpdateTeam(editing.id, editing);
    setEditing(null);
    setSaved(true);
    load();
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <AdminPageHeader title="Team" description="Team members on the public site" />

      {saved ? <p className="mb-4 text-sm text-green-600">Team member saved.</p> : null}

      {editing ? (
        <Card className="mb-8 max-w-2xl">
          <CardHeader>
            <CardTitle>Edit team member</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageUploadField
              label="Photo"
              value={editing.photo || ""}
              onChange={(photo) => setEditing({ ...editing, photo })}
              folder="team"
              aspect={3 / 4}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={editing.role}
                  onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                value={editing.bio}
                onChange={(e) => setEditing({ ...editing, bio: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>LinkedIn</Label>
                <Input
                  value={editing.linkedin}
                  onChange={(e) => setEditing({ ...editing, linkedin: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>GitHub</Label>
                <Input
                  value={editing.github}
                  onChange={(e) => setEditing({ ...editing, github: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => void save()}>Save</Button>
              <Button variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <CrmPanel title="Team roster" description={`${team.length} member(s)`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Lead</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell className="text-muted-foreground">{m.role}</TableCell>
                <TableCell>{m.is_lead ? <Badge>Lead</Badge> : "—"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Edit"
                    onClick={() => setEditing(m)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CrmPanel>
    </div>
  );
}
