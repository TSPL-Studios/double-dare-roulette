import { useState } from "react";
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

export function SettingsMenu() {
  const { theme, setTheme } = useTheme();
  const [openCredits, setOpenCredits] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const isDark = theme !== "light";

  const faqs = [
    {
      question: "How do I change the theme?",
      answer: "You can toggle between light and dark mode using the switch in the settings menu.",
    },
    {
      question: "Who built this app?",
      answer: "This app was built by Teamslepperlin0.",
    },
    {
      question: "How can I provide feedback?",
      answer: "You can send us feedback via email at feedback@example.com.",
    },
  ];

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

          {/* FAQ Separator and Label */}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="cursor-default select-none">FAQ</DropdownMenuLabel>

          {/* FAQ Item - Mobile only */}
          <DropdownMenuItem
            onClick={() => setOpenFAQ(true)}
            className="flex items-center justify-between md:hidden"
          >
            <span>FAQ</span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Credits dialog */}
      <Dialog open={openCredits} onOpenChange={setOpenCredits}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Double Dare</DialogTitle>
            <DialogDescription>
              Built by Teamslepperlin0
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* FAQ dialog */}
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