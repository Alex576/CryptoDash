import { TooltipProvider } from "#components/ui/tooltip";
import { AllCommunityModule, enableDevValidations } from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./core/router";

const modules = [AllCommunityModule];

function App() {
  if (import.meta.env.DEV) {
    enableDevValidations();
  }
  return (
    <TooltipProvider>
      <AgGridProvider modules={modules}>
        <RouterProvider router={router} />
      </AgGridProvider>
    </TooltipProvider>
  );
}

export default App;
