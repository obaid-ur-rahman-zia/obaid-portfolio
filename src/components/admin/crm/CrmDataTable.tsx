import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function CrmDataTable({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <Table>{children}</Table>
    </div>
  );
}
