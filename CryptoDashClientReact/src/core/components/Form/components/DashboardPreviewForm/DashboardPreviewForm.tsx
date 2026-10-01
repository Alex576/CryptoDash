import { useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "#components/ui/button";
import { Loading } from "@/core/components/Loading/Loading";
import { SidePanelContext } from "@/core/components/SidePanel/SidePanelContext";
import {
  useGetSettingsFormQuery,
  useSaveSettingsFormMutation,
  useUpdateSettingsFormMutation,
} from "@/core/features/settings/settingsApiSlice";
import { ToolCode } from "@/core/share/tool-code";
import { useTranslation } from "react-i18next";
import { Form } from "../../Form";
import type { FormValues } from "../../models/FormModels";

export interface DashboardPreviewFormProps {
  onFormStateChange?: (state: { isChanged: boolean }) => void;
}

export function DashboardPreviewForm({
  onFormStateChange,
}: DashboardPreviewFormProps) {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState<FormValues>();
  const sidePanelContext = useContext(SidePanelContext);
  const [canSave, setCanSave] = useState<boolean>(false);

  const {
    data: form,
    isFetching,
    isError,
  } = useGetSettingsFormQuery({
    toolCode: ToolCode.Dashboard,
    formValues: formValues,
  });

  const [saveForm, { isError: onSaveError, isLoading: isSaving }] =
    useSaveSettingsFormMutation();
  const [updateForm, { isError: onUpdateError, isLoading: isUpdating }] =
    useUpdateSettingsFormMutation();

  const handleFormChange = useCallback(
    async (formValues: FormValues) => {
      try {
        const req = await updateForm({
          toolCode: ToolCode.Dashboard,
          formValues,
        }).unwrap();
      } catch (error) {
        console.error(error);
      }
    },
    [updateForm],
  );

  const handleSaveForm = useCallback(
    async (data: unknown) => {
      try {
        const request = await saveForm(data).unwrap();
      } catch (error) {
        console.error(error);
      }
    },
    [saveForm],
  );

  if (!sidePanelContext.actionsRef) {
    return null;
  }
  if (isFetching) return <Loading />;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <Form
        controls={form!.controls}
        onFormStateChange={(state) => {
          sidePanelContext.setCloseState(state.isChanged);
        }}
        onCanSaveForm={setCanSave}
        onFormValueChanged={handleFormChange}
      ></Form>
      {createPortal(
        <Button disabled={!canSave} onClick={handleSaveForm}>
          {t("Form.Button.Save")}
        </Button>,
        sidePanelContext.actionsRef,
      )}
    </div>
  );
}
