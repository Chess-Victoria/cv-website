'use client'

import Link from 'next/link'
import type { MenuItem } from '@/lib/types/menu'

type MenuItemsProps = {
    items: MenuItem[]
    mode: 'desktop' | 'mobile'
    activeAccordionId?: string | null
    onToggleAccordion?: (id: string) => void
    onNavigate?: () => void
}

function MenuNode({ item, mode, activeAccordionId, onToggleAccordion, onNavigate }: MenuItemsProps & { item: MenuItem }) {
    const hasChildren = item.items.length > 0
    const isOpen = mode === 'mobile' && activeAccordionId === item.id

    return (
        <li className={mode === 'mobile' && hasChildren ? 'has-sub hash-has-sub' : undefined}>
            {mode === 'mobile' && hasChildren && (
                <span
                    className={`submenu-button ${isOpen ? 'submenu-opened' : ''}`}
                    onClick={() => onToggleAccordion?.(item.id)}
                >
                    <em />
                </span>
            )}
            <Link href={item.url} className={mode === 'mobile' ? 'hash-nav' : undefined} onClick={onNavigate}>
                {item.name}
                {mode === 'desktop' && hasChildren && <i className="fa-solid fa-angle-down" />}
            </Link>
            {hasChildren && mode === 'desktop' && (
                <ul className="dropdown-padding">
                    <MenuItems
                        items={item.items}
                        mode={mode}
                        activeAccordionId={activeAccordionId}
                        onToggleAccordion={onToggleAccordion}
                        onNavigate={onNavigate}
                    />
                </ul>
            )}
            {hasChildren && mode === 'mobile' && (
                <ul className={`sub-menu ${isOpen ? 'open-sub' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
                    <MenuItems
                        items={item.items}
                        mode={mode}
                        activeAccordionId={activeAccordionId}
                        onToggleAccordion={onToggleAccordion}
                        onNavigate={onNavigate}
                    />
                </ul>
            )}
        </li>
    )
}

export default function MenuItems({ items, mode, activeAccordionId, onToggleAccordion, onNavigate }: MenuItemsProps) {
    return (
        <>
            {items.map((item) => (
                <MenuNode
                    key={item.id}
                    item={item}
                    items={items}
                    mode={mode}
                    activeAccordionId={activeAccordionId}
                    onToggleAccordion={onToggleAccordion}
                    onNavigate={onNavigate}
                />
            ))}
        </>
    )
}
