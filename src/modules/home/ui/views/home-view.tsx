'use client'
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation';
import React from 'react'

export const HomeView = () => {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    if (!session) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>
            {session && (
                <div className="flex items-center gap-4">
                    <div className="border-3 rounded-md">
                        <h1 className="text-xl font-semibold">
                            Logged in as: {session.user.name}
                        </h1>
                        <p>email: {session.user.email}</p>
                    </div>
                    <Button onClick={() => authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => router.push("/sign-in")
                        }
                    })}>
                        Logout
                    </Button>
                </div>)}
        </div>
    )
}
