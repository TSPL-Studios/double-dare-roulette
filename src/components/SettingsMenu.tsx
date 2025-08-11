import { useState } from "react";
import { Settings, Moon, SunMedium, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";

export function SettingsMenu() {
  const { theme, setTheme } = useTheme();
  const [openCredits, setOpenCredits] = useState(false);
  const isDark = theme !== "light"; // default dark

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center justify-between gap-2" onSelect={(e) => e.preventDefault()}>
            <div className="flex items-center gap-2">
              {isDark ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
              <span>Dark mode</span>
            </div>
            <Switch checked={isDark} onCheckedChange={(v) => setTheme(v ? "dark" : "light")} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenCredits(true)}>
            <Info className="mr-2 h-4 w-4" />
            <span>Credits</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openCredits} onOpenChange={setOpenCredits}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Double Dare</DialogTitle>
            <DialogDescription>
              Built with React, Tailwind, shadcn/ui, and Supabase. Design: mobile-first, dark theme.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
