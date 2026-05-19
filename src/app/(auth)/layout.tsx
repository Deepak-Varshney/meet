import React from 'react'
interface props {
    children: React.ReactNode
}
const AuthLayout = ({ children }: props) => {
    return (
        <div className='bg-muted flex flex-col justify-center items-center min-h-svh p-6 md:p-10'>
            <div className='w-full max-w-sm md:max-w-3xl'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout