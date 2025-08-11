import { Card, CardContent } from "@/components/ui/card";
import type { Dare } from "@/features/dare/api";

export function DareCard({ dare }: { dare: Dare }) {
  return (
    <Card key={dare.id} className="rounded-2xl animate-fade-in">
      <CardContent className="p-6 text-center">
        <h2 className="mb-2 text-2xl font-bold leading-tight">{dare.title}</h2>
        {dare.description && (
          <p className="text-balance text-muted-foreground">{dare.description}</p>
        )}
      </CardContent>
    </Card>
  );
}
