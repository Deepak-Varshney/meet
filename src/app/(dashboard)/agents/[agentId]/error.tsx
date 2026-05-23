'use client'

import { ErrorState } from "@/components/error-state"

const ErrorPage = () => {
  return (
    <ErrorState title="Error Loading Agent Data" description="Something went wrong"/>
  )
}

export default ErrorPage