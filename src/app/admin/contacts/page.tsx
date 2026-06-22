"use client";

import { useEffect, useState } from "react";
import { adminGetContacts, adminMarkContactRead } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import type { ContactSubmission } from "@/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CrmPanel } from "@/components/admin/crm/CrmPanel";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);

  const load = () => adminGetContacts().then(setContacts).catch(() => setContacts([]));
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <AdminPageHeader title="Messages" description="Contact form inbox — mark items read when handled." />
      <CrmPanel title="Inbox" description={`${contacts.length} message(s)`}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-muted-foreground">{c.email}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(c.submitted_at)}</TableCell>
                  <TableCell>
                    {c.read ? (
                      <Badge variant="secondary">Read</Badge>
                    ) : (
                      <Badge>New</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {!c.read && (
                      <Button variant="outline" size="sm" onClick={() => adminMarkContactRead(c.id).then(load)}>
                        Mark read
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </CrmPanel>
      {contacts[0] && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Latest message</CardTitle>
            <CardDescription>
              From {contacts[0].name} · {contacts[0].email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{contacts[0].message}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
