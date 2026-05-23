'use client'

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import { NewAgentDialog } from "./agent-dialog"
import { useEffect, useState } from "react"
import { useAgentFilters } from "../../hooks/use-agents-filters"
import { AgentsSearchFilter } from "./agents-search-filter"

export const AgentsListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filters, setFilters] = useAgentFilters();
    const isAnyFilterModified = !!filters.search;

    const onClearFilters = () => {
        setFilters({
            search: "",
            page: 1
        });
    }
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            // Check if user is typing in an input field to avoid accidental triggers
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            if (e.key.toLowerCase() === 'n' && e.altKey) {
                e.preventDefault()
                setIsDialogOpen(true)
                console.log("DONE")
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])
    return (
        <>
            <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Agents</h5>
                    <Button onClick={() => setIsDialogOpen(prev => !prev)}>
                        <PlusIcon />
                        <span>New Agent</span>
                        <span className="text-xs text-text ml-2">(Alt + N)</span>
                    </Button>
                </div>
                <div className="flex items-center gap-x-2 p-1">
                    <AgentsSearchFilter />
                    {
                        isAnyFilterModified && <Button onClick={onClearFilters}>
                            <XCircleIcon/>
                            Clear
                        </Button>
                    }
                </div>
            </div>
        </>
    )
}