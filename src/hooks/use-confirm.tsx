import { JSX, useState } from "react";
import { ResponsiveDialog } from "@/components/responsive-dialoge";
import { Button } from "@/components/ui/button";

export const useConfirm = (
        title: string,
        description: string,
    ): [() => JSX.Element, () => Promise<unknown>] => {
            const [promise, setPromise] = useState<{
                    resolve: (value: boolean) => void;
                } | null>(null);

                const confirm = () => {
        return new Promise((resolve) => {
                setPromise({ resolve });
            })
        }
        const handleClose = () => {
        setPromise(null);
    }
    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    }
    const handleCancel = () => {
            promise?.resolve(false);
            handleClose()
        }
    
        const ConfirmationDialog = () => (
                <ResponsiveDialog open={promise !== null} onOpenChange={handleCancel} title={title} description={description}>
            <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
                <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="w-full lg:w-auto"
                >Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="destructive"
                    className="w-full lg:w-auto"
                >Confirm
                </Button>
            </div>
        </ResponsiveDialog>


    )
return [ConfirmationDialog, confirm]
}

// import { JSX, useState } from "react";

// import { ResponsiveDialog } from "@/components/responsive-dialoge";
// import { Button } from "@/components/ui/button";

// type ConfirmDialog = () => JSX.Element;

// export const useConfirm = (
//   title: string,
//   description: string
// ): [ConfirmDialog, () => Promise<boolean>] => {
//   const [promise, setPromise] = useState<{
//     resolve: (value: boolean) => void;
//   } | null>(null);

//   const confirm = () => {
//     return new Promise<boolean>((resolve) => {
//       setPromise({ resolve });
//     });
//   };

//   const handleClose = () => {
//     setPromise(null);
//   };

//   const handleConfirm = () => {
//     promise?.resolve(true);
//     handleClose();
//   };

//   const handleCancel = () => {
//     promise?.resolve(false);
//     handleClose();
//   };

//   const ConfirmationDialog = () => (
//     <ResponsiveDialog
//       open={promise !== null}
//       onOpenChange={handleCancel}
//       title={title}
//       description={description}
//     >
//       <div className="pt-4 flex w-full flex-col-reverse items-center justify-end gap-x-2 gap-y-2 lg:flex-row">
//         <Button
//           onClick={handleCancel}
//           variant="outline"
//           className="w-full lg:w-auto"
//         >
//           Cancel
//         </Button>

//         <Button
//           onClick={handleConfirm}
//           className="w-full lg:w-auto"
//         >
//           Confirm
//         </Button>
//       </div>
//     </ResponsiveDialog>
//   );

//   return [ConfirmationDialog, confirm];
// };