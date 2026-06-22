"use client";

import { useEffect, useState } from "react";
import { adminGetTeam } from "@/lib/api";
import type { TeamMember } from "@/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/ui/badge";
import { CrmPanel } from "@/components/admin/crm/CrmPanel";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    adminGetTeam().then(setTeam).catch(() => setTeam([]));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <AdminPageHeader title="Team" description="Team members on the public site" />
      <CrmPanel title="Team roster" description={`${team.length} member(s)`}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Lead</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell className="text-muted-foreground">{m.role}</TableCell>
                  <TableCell>{m.is_lead ? <Badge>Lead</Badge> : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </CrmPanel>
    </div>
  );
}
