'use client'

import { useEffect, useState } from 'react'
import type { MenuItem } from '@/lib/types/menu'
import LayoutClient from './LayoutClient'

interface LayoutProps {
    headerStyle?: Number
    footerStyle?: Number
    children?: React.ReactNode
    breadcrumbTitle?: string
}

export default function Layout({ headerStyle, footerStyle, breadcrumbTitle, children }: LayoutProps) {
    const [menu, setMenu] = useState<MenuItem[]>([])

    useEffect(() => {
        let mounted = true

        async function loadMenu() {
            try {
                const response = await fetch('/api/menu', { cache: 'no-store' })
                if (!response.ok) {
                    return
                }
                const items: MenuItem[] = await response.json()
                if (mounted) {
                    setMenu(items)
                }
            } catch {
                if (mounted) {
                    setMenu([])
                }
            }
        }

        loadMenu()

        return () => {
            mounted = false
        }
    }, [])

    return (
        <LayoutClient headerStyle={headerStyle} footerStyle={footerStyle} breadcrumbTitle={breadcrumbTitle} menu={menu}>
            {children}
        </LayoutClient>
    )
}
