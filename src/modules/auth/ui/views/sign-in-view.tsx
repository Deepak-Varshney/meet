'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogInIcon, OctagonAlertIcon } from "lucide-react";




const formSchema = z.object({
    email: z.email(),
    password: z.string().min(1, { error: "Password is Required" })
});


export const SignInView = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null)
    const [googleLoading, setGoogleLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const {
        formState: { isSubmitting }
    } = form;
    async function onSubmit(data: z.infer<typeof formSchema>) {
        setError(null);
        await authClient.signIn.email({
            email: data.email,
            password: data.password,
            callbackURL: "/"
        }, {
            onSuccess: () => router.push("/"),
            onError: ({ error }) => setError(error.message)
        })
    }

    async function handleGoogleLogin() {
        try {
            setGoogleLoading(true);

            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            }, {
                onSuccess: () => router.push("/"),

                onError: ({ error }) => setError(error.message)
            });
        } catch (error) {
            setGoogleLoading(false);
            toast.error("Something went wrong");
        }
    }
    return (
        <div className="flex gap-6 flex-col">

            <Card className="overflow-hidden p-0">
                <CardContent className="grid md:grid-cols-2 p-0">
                    <form id="login-form" className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="font-bold text-2xl">Welcome Back</h1>
                                <p className="text-muted-foreground text-balance">
                                    Login to your account
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <FieldGroup>
                                    <Controller
                                        name="email"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-demo-title">
                                                    Email
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Enter your email"
                                                    autoComplete="off"
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
                                        name="password"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-demo-title">
                                                    Password
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Enter your password"
                                                    autoComplete="off"
                                                    type="password"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                                {error && <Field orientation="horizontal">
                                    <Alert className="bg-destructive/10 border-none">
                                        <OctagonAlertIcon className="h-4 w-4 text-destructive!" />
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                </Field>}
                                <Field orientation="horizontal">
                                    <Button type="submit" form="login-form" disabled={isSubmitting}>
                                        {isSubmitting ? "Signing in..." : "Sign In"}

                                    </Button>
                                </Field>
                                <div className="text-center text-sm text-muted-foreground">
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        href="/sign-up"
                                        className="text-primary hover:underline font-medium"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                            <Field orientation="vertical">
                                <Button
                                    type="button"
                                    form="login-form"
                                    onClick={handleGoogleLogin}
                                    disabled={googleLoading || isSubmitting}
                                >
                                    {googleLoading ? "Redirecting..." : "Continue with Google"}
                                    <LogInIcon />
                                </Button>
                            </Field>
                        </div>
                    </form>
                    <div className="bg-radial from-green-700 to-green-900 relative md:flex flex-col gap-y-4 items-center justify-center">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={92}
                            height={92}
                            className="h-23 w-23"
                        />
                        <p className="text-2xl font-semibold text-white">
                            Meet. AI
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}