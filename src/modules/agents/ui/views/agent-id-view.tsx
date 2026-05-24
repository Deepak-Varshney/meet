// 'use client'
// import { useTRPC } from "@/trpc/client";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import { AgentIdViewHeader } from "./agent-id-view-hearder";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { VideoIcon } from "lucide-react";

// interface Props {
//     agentId: string
// }

// export const AgentIdView = ({ agentId }: Props) => {
//     const trpc = useTRPC();
//     const { data } = useSuspenseQuery(trpc.agents.getone.queryOptions({ id: agentId }))
//     const avatarFallback = data.name ? data.name.substring(0, 2).toUpperCase() : "AG"

//     return (
//         <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
//             <AgentIdViewHeader
//                 agentId={agentId}
//                 agentName={data.name}
//                 onEdit={() => { }}
//                 onRemove={() => { }}
//             />
//             <div className="bg-white rounded-lg border">
//                 <div className="px-4 py-5 gap-y-5 flex-col col-span-5">
//                     <div className="flex items-center gap-x-3">
//                         <Avatar className="h-20 w-20">
//                             <AvatarImage src="" alt={data.name || "Agent Avatar"} />
//                             <AvatarFallback>{avatarFallback}</AvatarFallback>
//                         </Avatar>
//                         <h2 className="text-2xl font-medium">{data.name}</h2>
//                     </div>
//                     <Badge variant={"outline"} className="flex items-center gap-x-2 [&>svg]:size-4">
//                         <VideoIcon className="text-" />
//                         {data.meetingCount}{data.meetingCount === 1 ? "meeting" : "meetings"}
//                     </Badge>
//                     <div className="flex flex-col gap-y-4">
//                         <p className="text-lg font-medium">Instructions</p>
//                         <p className="text-neutral-800">{data.instructions}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
'use client'

import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "./agent-id-view-hearder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon, ShieldAlert, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { EditAgentDialog } from "../components/agent-dialog";
import { useState } from "react";

interface Props {
    agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getone.queryOptions({ id: agentId }));
    const queryClient = useQueryClient()
    const avatarFallback = data.name ? data.name.substring(0, 2).toUpperCase() : "AG";
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Delete Agent",
        `The following action will remove ${data.meetingCount} associated meetings. This action cannot be undone.`
    )
    const handleDelete = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.agents.getmany.queryOptions({}))
                router.push("/agents")
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    )

    const handleRemoveAgent = async () => {
        const ok = await confirmRemove()
        if (!ok) return;
        if (ok) {
            handleDelete.mutateAsync({ id: agentId })
        }
    }

    return (
        <>
            <RemoveConfirmation />
            <EditAgentDialog initialValues={data} open={isDialogOpen} onOpenChange={setIsDialogOpen} />

            <div className="flex-1 flex flex-col gap-y-6 py-6 px-4 md:px-8 w-full transition-colors duration-200">
                {/* Header Section */}
                <AgentIdViewHeader
                    agentId={agentId}
                    agentName={data.name}
                    onEdit={() => { setIsDialogOpen(true) }}
                    onRemove={handleRemoveAgent}
                />

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left/Top Profile Summary Panel */}
                    <div className="lg:col-span-1 bg-card text-card-foreground rounded-xl border border-border p-6 flex flex-col items-center text-center justify-between gap-y-6 shadow-sm">
                        <div className="flex flex-col items-center gap-y-4 w-full">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                                <Avatar className="h-24 w-24 border-4 border-background shadow-md relative z-10">
                                    <AvatarImage src="" alt={data.name || "Agent Avatar"} />
                                    <AvatarFallback className="bg-muted text-muted-foreground font-bold text-xl tracking-wider">
                                        {avatarFallback}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                                    {data.name || "Unnamed Agent"}
                                </h2>
                                <div className="flex items-center justify-center gap-x-1.5 text-xs font-medium text-muted-foreground">
                                    <Cpu className="size-3.5 text-primary" />
                                    <span>Active AI Core Instance</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full pt-4 border-t border-border/60">
                            <Badge
                                variant="secondary"
                                className="w-full py-2 justify-center gap-x-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            >
                                <VideoIcon className="size-4 text-primary" />
                                <span>
                                    {data.meetingCount} {data.meetingCount === 1 ? "meeting" : "meetings"}
                                </span>
                            </Badge>
                        </div>
                    </div>

                    {/* Right/Bottom Detailed Configuration Panel */}
                    <div className="lg:col-span-2 bg-card text-card-foreground rounded-xl border border-border shadow-sm flex flex-col">
                        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Agent Behavior Specification
                            </span>
                        </div>

                        <div className="p-6 flex-1 flex flex-col gap-y-4">
                            <h3 className="text-lg font-medium text-foreground tracking-tight">
                                Instructions
                            </h3>
                            <div className="bg-muted/40 text-foreground border border-border/80 rounded-lg p-4 flex-1">
                                <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
                                    {data.instructions}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};