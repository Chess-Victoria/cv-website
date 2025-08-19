import NotFoundPage from '@/components/elements/NotFoundPage'

export default function NotFound() {
  return (
    <NotFoundPage
      title="Gallery Not Found"
      subtitle="404 - Gallery Not Found"
      description="The gallery you're looking for doesn't exist or may have been removed."
      primaryAction={{
        text: "Back to All Galleries",
        href: "/galleries"
      }}
      secondaryAction={{
        text: "Return to Homepage",
        href: "/"
      }}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Galleries', link: '/galleries' },
        { name: 'Not Found', link: '/galleries' }
      ]}
      backgroundImage="/assets/img/bg/header-bg9.png"
    />
  )
}
