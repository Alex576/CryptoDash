import { Toaster } from "#components/ui/toast";
import { TooltipProvider } from "#components/ui/tooltip";
import { AllCommunityModule, enableDevValidations } from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./core/components";
import { router } from "./core/router";

const modules = [AllCommunityModule];

function App() {
  if (import.meta.env.DEV) {
    enableDevValidations();
  }
  return (
    <ThemeProvider>
      <TooltipProvider>
        <AgGridProvider modules={modules}>
          <RouterProvider router={router} />
        </AgGridProvider>
        <Toaster timeout={5000} />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
