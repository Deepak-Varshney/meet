'use client'

import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from '@/components/ui/sidebar'
import { BotIcon, StarIcon, User2, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { DashboardUserButton } from './dashboard-user-button'


const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings"
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: '/agents'
    }
]
const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade"
    },
]

export const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className=''>
                <Link href="/" className='flex items-center gap-2 px-2 pt-2'>
                    <Image alt="Logo" src={'/logo.svg'} width={36} height={36} />
                    Meet. AI
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <SidebarSeparator className='' />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                firstSection.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-primary-foreground from-sidebar-primary from-5% via-50% via-sidebar-primary/50 to-sidebar/50", pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10")}
                                            isActive={pathname === item.href}
                                        >
                                            <Link href={item.href}>
                                                <item.icon className='size-5' />
                                                <span className='tracking-tight text-sm font-medium'>
                                                    {item.label}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                    <SidebarSeparator className='' />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                secondSection.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-primary-foreground from-sidebar-primary from-5% via-50% via-sidebar-primary/50 to-sidebar/50", pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10")}
                                            isActive={pathname === item.href}
                                        >
                                            <Link href={item.href}>
                                                <item.icon className='size-5' />
                                                <span className='tracking-tight text-sm font-medium'>
                                                    {item.label}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
               <DashboardUserButton/>
            </SidebarFooter>
        </Sidebar>
    )
}
