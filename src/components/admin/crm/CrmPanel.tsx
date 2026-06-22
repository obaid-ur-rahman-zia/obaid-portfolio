import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CrmPanelProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function CrmPanel({ title, description, action, children, className, noPadding }: CrmPanelProps) {
  return (
    <Card className={cn("shadow-sm border-border/80", className)}>
      {(title || action) && (
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4 border-b border-border/60">
          <div>
            {title && <CardTitle className="text-base font-semibold">{title}</CardTitle>}
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
          </div>
          {action}
        </CardHeader>
      )}
      <CardContent className={cn(noPadding ? "p-0" : title ? "pt-0 px-0 pb-0" : "p-6")}>{children}</CardContent>
    </Card>
  );
}
