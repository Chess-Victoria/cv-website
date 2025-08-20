import NotFoundPage from '@/components/elements/NotFoundPage'

export default function NotFound() {
  return (
    <NotFoundPage
      title="Event Not Found"
      subtitle="404 - Event Not Found"
      description="The event you're looking for doesn't exist or may have been moved."
      primaryAction={{
        text: "Browse All Events",
        href: "/events"
      }}
      secondaryAction={{
        text: "Return to Homepage",
        href: "/"
      }}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Events', link: '/events' },
        { name: 'Not Found', link: '/events' }
      ]}
      backgroundImage="/assets/img/bg/header-bg8.png"
    />
  )
}
