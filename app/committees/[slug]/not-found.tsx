import NotFoundPage from '@/components/elements/NotFoundPage'

export default function NotFound() {
  return (
    <NotFoundPage
      title="Committee Member Not Found"
      subtitle="404 - Committee Member Not Found"
      description="The committee member you're looking for doesn't exist or may have been removed."
      primaryAction={{
        text: "Back to Committees",
        href: "/committees"
      }}
      secondaryAction={{
        text: "Return to Homepage",
        href: "/"
      }}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Committees', link: '/committees' },
        { name: 'Not Found', link: '/committees' }
      ]}
      backgroundImage="/assets/img/bg/header-bg7.png"
    />
  )
}
