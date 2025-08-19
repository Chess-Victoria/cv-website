import NotFoundPage from '@/components/elements/NotFoundPage'

export default function NotFound() {
  return (
    <NotFoundPage
      title="Player Title Not Found"
      subtitle="404 - Title Not Found"
      description="The player title category you're looking for doesn't exist or may have been moved."
      primaryAction={{
        text: "Browse All Players",
        href: "/about/players"
      }}
      secondaryAction={{
        text: "Return to Homepage",
        href: "/"
      }}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Players', link: '/about/players' },
        { name: 'Titles', link: '/about/players/titles' },
        { name: 'Not Found', link: '/about/players/titles' }
      ]}
      backgroundImage="/assets/img/bg/header-bg8.png"
    />
  )
}
