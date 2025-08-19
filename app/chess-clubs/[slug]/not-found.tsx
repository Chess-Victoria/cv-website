import NotFoundPage from '@/components/elements/NotFoundPage'

export default function NotFound() {
  return (
    <NotFoundPage
      title="Chess Club Not Found"
      subtitle="404 - Chess Club Not Found"
      description="The chess club you're looking for doesn't exist or may have been moved."
      primaryAction={{
        text: "Browse All Chess Clubs",
        href: "/chess-clubs"
      }}
      secondaryAction={{
        text: "Return to Homepage",
        href: "/"
      }}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Chess Clubs', link: '/chess-clubs' },
        { name: 'Not Found', link: '/chess-clubs' }
      ]}
      backgroundImage="/assets/img/bg/header-bg9.png"
    />
  )
}
