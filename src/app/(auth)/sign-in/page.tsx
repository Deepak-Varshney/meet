import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { SignInView } from '@/modules/auth/ui/views/sign-in-view'
import { auth } from '@/lib/auth'
import React from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const LoginPage = async () => {


    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        redirect("/")
    }
    return (
        <SignInView />
    )
}

export default LoginPage