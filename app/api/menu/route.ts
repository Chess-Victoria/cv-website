import { NextResponse } from 'next/server'
import { getMainMenuItems } from '@/lib/utils/menu'

export async function GET() {
    try {
        const menu = await getMainMenuItems()
        return NextResponse.json(menu)
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to load menu' },
            { status: 500 }
        )
    }
}
