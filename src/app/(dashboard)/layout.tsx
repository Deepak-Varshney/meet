import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/modules/dashboard/ui/components/dashboard-sidebar';
import React from 'react'
interface Props {
    children: React.ReactNode;
}
const DashboardLayout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className=''>{children}</main>
        </SidebarProvider >
    )
}

export default DashboardLayout