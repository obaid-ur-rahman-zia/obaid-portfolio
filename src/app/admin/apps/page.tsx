"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { adminDeleteApp, adminGetApps, adminCreateApp, adminUpdateApp } from "@/lib/api";
import type { AppItem } from "@/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CrmPanel } from "@/components/admin/crm/CrmPanel";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const empty: Partial<AppItem> = {
  name: "",
  slug: "",
  short_description: "",
  full_description: "",
  category: "Productivity",
  icon: "",
  screenshots: [],
  tech_stack: [],
  features: [],
  download_link: "",
  featured: false,
  order: 0,
};

export default function AdminAppsPage() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [editing, setEditing] = useState<Partial<AppItem> | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => adminGetApps().then(setApps).catch(() => setApps([]));
  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!editing?.name || !editing.slug) return;
    const payload = {
      ...editing,
      screenshots:
        typeof editing.screenshots === "string"
          ? (editing.screenshots as string).split("\n").filter(Boolean)
          : editing.screenshots,
      tech_stack:
        typeof editing.tech_stack === "string"
          ? (editing.tech_stack as string).split(",").map((s) => s.trim())
          : editing.tech_stack,
      features:
        typeof editing.features === "string"
          ? (editing.features as string).split("\n").filter(Boolean)
          : editing.features,
    };
    if (editing.id) await adminUpdateApp(editing.id, payload);
    else await adminCreateApp(payload);
    setShowForm(false);
    setEditing(null);
    load();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <AdminPageHeader
        title="Projects"
        description="Manage portfolio projects shown on the public site"
        action={
          <Button
            onClick={() => {
              setEditing(empty);
              setShowForm(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add project
          </Button>
        }
      />

      {showForm && editing && (
        <Card className="mb-8 max-w-2xl">
          <CardHeader>
            <CardTitle>{editing.id ? "Edit project" : "New project"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={editing.category || ""}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon URL</Label>
                <Input value={editing.icon || ""} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Short description</Label>
              <Input
                value={editing.short_description || ""}
                onChange={(e) => setEditing({ ...editing, short_description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Full description</Label>
              <Textarea
                value={editing.full_description || ""}
                onChange={(e) => setEditing({ ...editing, full_description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Features (one per line)</Label>
              <Textarea
                value={Array.isArray(editing.features) ? editing.features.join("\n") : ""}
                onChange={(e) => setEditing({ ...editing, features: e.target.value.split("\n") })}
              />
            </div>
            <div className="space-y-2">
              <Label>Download link</Label>
              <Input
                value={editing.download_link || ""}
                onChange={(e) => setEditing({ ...editing, download_link: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={save}>Save</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <CrmPanel title="All projects" description={`${apps.length} project(s) in portfolio`}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.name}</TableCell>
                  <TableCell className="text-muted-foreground">{app.category}</TableCell>
                  <TableCell>
                    {app.featured ? (
                      <Badge>Featured</Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">No</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit"
                        onClick={() => {
                          setEditing(app);
                          setShowForm(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete"
                        className="text-destructive hover:text-destructive"
                        onClick={async () => {
                          await adminDeleteApp(app.id);
                          load();
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </CrmPanel>
    </div>
  );
}
