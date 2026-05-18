'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

export default function Home() {
  const { data, isPending } = authClient.useSession()

  // Signup state
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    if (!signupName || !signupEmail || !signupPassword) {
      alert("Please fill all signup fields")
      return
    }

    setLoading(true)

    await authClient.signUp.email(
      {
        email: signupEmail,
        password: signupPassword,
        name: signupName,
      },
      {
        onRequest: () => console.log("Creating account..."),
        onError: (e) => {
          alert(`Error: ${e.error.message}`)
          setLoading(false)
        },
        onSuccess: () => {
          alert("Signup successful")
          setLoading(false)
        },
      }
    )
  }

  async function handleLogin() {
    if (!loginEmail || !loginPassword) {
      alert("Please fill all login fields")
      return
    }

    setLoading(true)

    await authClient.signIn.email(
      {
        email: loginEmail,
        password: loginPassword,
      },
      {
        onRequest: () => console.log("Logging in..."),
        onError: (e) => {
          alert(`Error: ${e.error.message}`)
          setLoading(false)
        },
        onSuccess: () => {
          alert("Login successful")
          setLoading(false)
        },
      }
    )
  }

  if (isPending) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="flex gap-8 p-6">
      {data ? (
        <div className="flex items-center gap-4">
          <div className="border-3 rounded-md">
            <h1 className="text-xl font-semibold">
              Logged in as: {data.user.name}
            </h1>
            <p>email: {data.user.email}</p>
          </div>

          <Button onClick={() => authClient.signOut()}>
            Logout
          </Button>
        </div>
      ) : (
        <>
          {/* Signup */}
          <div className="flex flex-col gap-3 w-80">
            <h2 className="text-lg font-semibold">Create Account</h2>

            <Input
              type="text"
              placeholder="Name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />

            <Input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />

            <Button onClick={handleSignup} disabled={loading}>
              {loading ? "Please wait..." : "Create User"}
            </Button>
          </div>

          {/* Login */}
          <div className="flex flex-col gap-3 w-80">
            <h2 className="text-lg font-semibold">Login</h2>

            <Input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <Button onClick={handleLogin} disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}