"use client";

import { useEffect, useState } from "react";
import { adminGetPlans, adminUpdatePlan } from "@/lib/api";
import type { Plan } from "@/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    adminGetPlans().then(setPlans).catch(() => setPlans([]));
  }, []);

  const save = async (plan: Plan) => {
    await adminUpdatePlan(plan.id, plan);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <AdminPageHeader title="Pricing plans" description="Edit Basic, Standard, and Premium tiers" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.highlighted ? "border-primary ring-1 ring-primary/30" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  {plan.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={plan.name}
                  onChange={(e) => setPlans(plans.map((p) => (p.id === plan.id ? { ...p, name: e.target.value } : p)))}
                />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  value={plan.price}
                  onChange={(e) => setPlans(plans.map((p) => (p.id === plan.id ? { ...p, price: e.target.value } : p)))}
                />
              </div>
              <div className="space-y-2">
                <Label>Features (one per line)</Label>
                <Textarea
                  value={plan.features.join("\n")}
                  onChange={(e) =>
                    setPlans(
                      plans.map((p) =>
                        p.id === plan.id ? { ...p, features: e.target.value.split("\n").filter(Boolean) } : p
                      )
                    )
                  }
                  rows={5}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`highlight-${plan.id}`}
                  checked={plan.highlighted}
                  onCheckedChange={(checked) =>
                    setPlans(plans.map((p) => (p.id === plan.id ? { ...p, highlighted: checked === true } : p)))
                  }
                />
                <Label htmlFor={`highlight-${plan.id}`} className="font-normal cursor-pointer">
                  Highlighted plan
                </Label>
              </div>
              <Button className="w-full" onClick={() => save(plan)}>
                Save {plan.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
