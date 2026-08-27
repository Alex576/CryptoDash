import { Button } from "#components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#components/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider/useTheme";

export function ThemeSwitcher() {
  const { theme, setTheme, nextTheme } = useTheme();
  return (
    <Tooltip>
      <TooltipTrigger
        closeOnClick={false}
        render={
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(nextTheme(theme))}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>
        }
      ></TooltipTrigger>
      <TooltipContent>
        <p>{theme}</p>
      </TooltipContent>
    </Tooltip>
  );
}
