import { Button } from "#components/ui/button";
import type { SettingsFormData } from "@/core/features/settings/models/settings";

export interface FormPreviewProps {
  data: SettingsFormData;
}

export function FormPreview({ data }: FormPreviewProps) {
  return (
    <div>
      <Button>Show Form</Button>
    </div>
  );
}
