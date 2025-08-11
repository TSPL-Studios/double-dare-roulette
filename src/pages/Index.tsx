import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useDares } from "@/features/dare/useDares";
import { SettingsMenu } from "@/components/SettingsMenu";

const Index = () => {
  const { currentDare, isLoading, error, getRandomDare, getPunishmentDare } = useDares();
  const hasDare = useMemo(() => Boolean(currentDare), [currentDare]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto flex max-w-md items-center justify-between p-4">
          <h1 className="text-lg font-semibold tracking-tight">Double Dare – Random Dare Generator</h1>
          <SettingsMenu />
        </nav>
      </header>

      <main className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-md flex-col items-center justify-center gap-6 p-4">
        <section className="w-full">
          {isLoading ? (
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </CardContent>
            </Card>
          ) : currentDare ? (
            <Card key={currentDare.id} className="rounded-2xl animate-fade-in">
              <CardContent className="p-6 text-center">
                <h2 className="mb-2 text-2xl font-bold leading-tight">{currentDare.title}</h2>
                {currentDare.description && (
                  <p className="text-balance text-muted-foreground">{currentDare.description}</p>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>Press “Get Dare” to start</p>
            </div>
          )}
          {error && (
            <p className="mt-3 text-center text-sm text-destructive">{error}</p>
          )}
        </section>

        <section className="mt-1 grid w-full grid-cols-1 gap-3">
          <Button size="lg" className="h-14 rounded-xl text-base" onClick={getRandomDare} disabled={isLoading}>
            Get Dare
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-14 rounded-xl text-base"
            onClick={getPunishmentDare}
            disabled={!hasDare || isLoading}
            aria-disabled={!hasDare || isLoading}
          >
            Double Dare
          </Button>
        </section>

        <footer className="pointer-events-none mt-auto pb-6 text-center text-xs text-muted-foreground">
          <p>No login. Mobile-first. Have fun and play safe.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
