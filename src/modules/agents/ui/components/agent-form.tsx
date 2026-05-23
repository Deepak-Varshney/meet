'use client'

import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AgentGetOne } from "../../types"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { agentInsertSchema } from "../../schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { OctagonAlertIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

interface AgentFormProps {
    onSuccess?: () => void
    onCancel?: () => void
    initialValues?: AgentGetOne
}

export const AgentForm = ({
    onSuccess, onCancel, initialValues
}: AgentFormProps) => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            instructions: initialValues?.instructions ?? ""
        }
    })

    const isEdit = !!initialValues?.id

    const createAgent = useMutation(trpc.agents.create.mutationOptions({
        onSuccess: () => {
            queryClient.invalidateQueries(trpc.agents.getmany.queryOptions({}));
            if (initialValues?.id) {
                queryClient.invalidateQueries(trpc.agents.getone.queryOptions({ id: initialValues.id }))
            }
            form.reset();
            onSuccess?.();
            toast.success("Agent Added Success")
        },
        onError: (err) => {
            toast.error(err.message)
            setError(err.message || "Something went wrong creating the agent.")
            // TODO: Check if error code is "FORBIDDEN", redirect to "/upgrade"
        }
    }))

    const isPending = createAgent.isPending

    const onSubmit = (values: z.infer<typeof agentInsertSchema>) => {
        setError(null)
        if (isEdit) {
            console.log("TODO: UPDATE AGENT")
        } else {
            createAgent.mutate(values)
        }
    }

    // Get a 2-letter fallback name from the form values or initials
    const agentName = form.watch("name")
    const avatarFallback = agentName ? agentName.substring(0, 2).toUpperCase() : "AG"

    return (
        <form id="agent-form" className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="" alt={agentName || "Agent Avatar"} />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Agent Avatar</p>
                    </div>
                </div>

                <div className="grid gap-3">
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="agent-name">
                                        Agent Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="agent-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter agent name"
                                        autoComplete="off"
                                        disabled={isPending}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Controller
                            name="instructions"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="agent-instructions">
                                        Instructions
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="agent-instructions"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="You are a helpful math assistant that can answer questions and help with assingments."
                                        autoComplete="off"
                                        disabled={isPending}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    {error && (
                        <Field orientation="horizontal">
                            <Alert className="bg-destructive/10 border-none">
                                <OctagonAlertIcon className="h-4 w-4 text-destructive" />
                                <AlertTitle>{error}</AlertTitle>
                            </Alert>
                        </Field>
                    )}
                </div>

                <div className="flex gap-2 justify-between">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onCancel}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? "Saving..." : isEdit ? "Update Agent" : "Create Agent"}
                    </Button>
                </div>
            </div>
        </form>
    )
}