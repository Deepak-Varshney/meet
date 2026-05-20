import { SidebarProvider } from '@/components/ui/sidebar';
import {DashboardNavbar} from '@/modules/dashboard/ui/components/dashboard-navbar';
import { DashboardSidebar } from '@/modules/dashboard/ui/components/dashboard-sidebar';
import React from 'react'
interface Props {
    children: React.ReactNode;
}
const DashboardLayout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className=''>
                <DashboardNavbar/>
                {children}
            </main>
        </SidebarProvider >
    )
}

export default DashboardLayout