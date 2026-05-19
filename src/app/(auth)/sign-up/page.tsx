import React from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { SignUpView } from '@/modules/auth/ui/views/sign-up-view'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'


const Signup = async() => {

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        redirect("/")
    }
    return (<SignUpView />)
}

export default Signup