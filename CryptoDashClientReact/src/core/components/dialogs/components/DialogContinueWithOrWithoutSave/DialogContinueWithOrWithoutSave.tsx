export interface DialogContinueWithOrWithoutSaveProps {
  open: boolean;
  onOpenChange: (_open: boolean) => void;

  onWithoutSave?: () => void;
  onSave?: () => void;
}

// export function DialogContinueWithOrWithoutSave({
//   onSave,
//   onWithoutSave,
// }: DialogContinueWithOrWithoutSaveProps) {
//   // const [isOpenAlertDialog, setIsOpenAlertDialog] = useState<boolean>(false);

//   const handleContinueWithoutSave = useCallback(() => {
//     setIsOpenAlertDialog(false);
//     if (onWithoutSave) onWithoutSave();
//   }, [onWithoutSave]);
//   const handleSave = useCallback(() => {
//     setIsOpenAlertDialog(false);
//     if (onSave) onSave();
//   }, [onSave]);

//   return (
//     <AlertDialog open={isOpenAlertDialog} onOpenChange={setIsOpenAlertDialog}>
//       <AlertDialogContent>
//         Confirm the action
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={handleContinueWithoutSave}>
//             Continue without save
//           </AlertDialogAction>
//           <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
