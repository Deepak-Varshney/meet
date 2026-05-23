import { ResponsiveDialog } from "@/components/responsive-dialoge";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface NewAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

}
interface EditAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues?: AgentGetOne;

}

export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange} title="New Agent" description="Create a new Agent" >
            <AgentForm onCancel={() => onOpenChange(false)} onSuccess={() => onOpenChange(false)} />
        </ResponsiveDialog>
    )
}
export const EditAgentDialog = ({ open, onOpenChange
    , initialValues
}: EditAgentDialogProps) => {
    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange} title="New Agent" description="Create a new Agent" >
            <AgentForm initialValues={initialValues} onCancel={() => onOpenChange(false)} onSuccess={() => onOpenChange(false)} />
        </ResponsiveDialog>
    )
}