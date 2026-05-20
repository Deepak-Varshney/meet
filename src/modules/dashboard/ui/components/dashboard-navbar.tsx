'use client'
import { Button } from '@/components/ui/button'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { useSidebar } from '@/components/ui/sidebar'
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { DashboardCommand } from './dashboard-command'

export const DashboardNavbar = () => {
    const { state, toggleSidebar, isMobile } = useSidebar()

    const [commandOpen, setCommandOpen] = useState(false)

    useEffect(() => {

        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setCommandOpen(c => !c)
            }
        }
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down)
    }, [])


    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
            <nav className='flex px-4 items-center gap-x-2 py-3 bg-background border-b'>
                <Button className='size-9' variant="outline" onClick={toggleSidebar}>
                    {(state === "collapsed" || isMobile) ? <PanelLeftIcon /> : <PanelLeftCloseIcon />}
                </Button>
                <Button variant="outline" size="sm" className='h-9 w-60 justify-start font-normal text-muted-foreground hover:text-muted-foreground' onClick={() => setCommandOpen(o => !o)}>
                    <SearchIcon />
                    Search
                    <Kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'>
                        <span className='text-xs'>&#8984; + K</span>
                    </Kbd>
                </Button>
            </nav>
        </>
    )
}
