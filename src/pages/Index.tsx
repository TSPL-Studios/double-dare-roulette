import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useDares } from "@/features/dare/useDares";
import { SettingsMenu } from "@/components/SettingsMenu";

const Index = () => {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const { currentDare, isLoading, error, getRandomDare, getPunishmentDare } = useDares();
  const hasDare = useMemo(() => Boolean(currentDare), [currentDare]);

  if (!ageConfirmed) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background p-4 text-center z-50">
        <p className="mb-6 text-lg font-semibold">
          This app contains NSFW content. You must be 18 or older to use it.
        </p>
        <Button onClick={() => setAgeConfirmed(true)} size="lg" className="px-8">
          I am 18 or older
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto flex max-w-md items-center justify-between p-4">
          <h1 aria-label="App title: Double Dare – Random Dare Generator" className="text-lg font-semibold tracking-tight">
            Double Dare – Random Dare Generator
          </h1>
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
          <p>NSFW content. For 18+ only. If under 18, please delete this app.</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;