import { CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command"
import { Dispatch, SetStateAction } from "react";
interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}
export const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <div
            className="bg-red-500"

        >
            <CommandResponsiveDialog title="Testing" description="DE" open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Find a meeting or agent"
                />
                <CommandList>
                    <CommandItem>
                        Test
                    </CommandItem>
                </CommandList>
            </CommandResponsiveDialog>
        </div>
    )
}