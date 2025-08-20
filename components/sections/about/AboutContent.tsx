'use client'
import WelcomeBlock from '@/components/sections/home1/WelcomeBlock'
import { WelcomeBlockData } from '@/components/sections/home1/WelcomeBlock'

interface AboutContentProps {
  overviewBlock?: WelcomeBlockData
}

export default function AboutContent({ overviewBlock }: AboutContentProps) {
  // If no overviewBlock data, return null or a loading state
  if (!overviewBlock) {
    return null
  }

  // Use the WelcomeBlock component directly with counter support
  return <WelcomeBlock data={overviewBlock} />
}
