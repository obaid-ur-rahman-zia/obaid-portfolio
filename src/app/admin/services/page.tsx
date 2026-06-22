"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { adminGetServices, adminDeleteService } from "@/lib/api";
import type { Service } from "@/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CrmPanel } from "@/components/admin/crm/CrmPanel";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    adminGetServices().then(setServices).catch(() => setServices([]));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <AdminPageHeader title="Services" description="Services listed on the public site" />
      <CrmPanel title="Service catalog" description={`${services.length} service(s)`}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Starting price</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.title}</TableCell>
                  <TableCell className="text-muted-foreground">{s.starting_price || "—"}</TableCell>
                  <TableCell>
                    {s.visible ? <Badge variant="secondary">Visible</Badge> : <Badge variant="outline">Hidden</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      aria-label="Delete"
                      onClick={async () => {
                        await adminDeleteService(s.id);
                        setServices((prev) => prev.filter((x) => x.id !== s.id));
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
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
