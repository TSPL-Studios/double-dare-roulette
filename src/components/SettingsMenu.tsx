import { useState, useEffect } from "react";

import { Settings, Moon, SunMedium, Info, ChevronDown } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";


export function SettingsMenu() {
  const { theme, setTheme } = useTheme();
  const [openCredits, setOpenCredits] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);

  const isDark = theme !== "light";

  useEffect(() => {
    async function loadFaqs() {
      const { data, error } = await (supabase as any)
        .from("faq")
        .select("question, answer")
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Error loading FAQs:", error);
      } else {
        setFaqs(data || []);
      }
    }

    loadFaqs();
  }, []);

  function toggleFAQ(index: number) {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  }

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
          <DropdownMenuItem
            className="flex items-center justify-between gap-2"
            onSelect={(e) => e.preventDefault()}
          >
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

          <DropdownMenuSeparator className="md:hidden" />
          <DropdownMenuLabel className="cursor-default select-none md:hidden">FAQ</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setOpenFAQ(true)}
            className="flex items-center justify-between md:hidden"
          >
            <span>FAQ</span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openCredits} onOpenChange={setOpenCredits}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Double Dare</DialogTitle>
            <DialogDescription>Built by Teamslepperlin0</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openFAQ} onOpenChange={setOpenFAQ}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>FAQ</DialogTitle>
            <DialogDescription>Frequently Asked Questions</DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-md p-3 cursor-pointer select-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={expandedFAQ === index}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleFAQ(index);
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      expandedFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFAQ === index && (
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}