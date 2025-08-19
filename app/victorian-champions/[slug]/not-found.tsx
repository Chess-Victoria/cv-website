import NotFoundPage from '@/components/elements/NotFoundPage'

export default function NotFound() {
  return (
    <NotFoundPage
      title="Victorian Champion Not Found"
      subtitle="404 - Champion Not Found"
      description="The Victorian champion you're looking for doesn't exist or may have been moved."
      primaryAction={{
        text: "Browse All Champions",
        href: "/victorian-champions"
      }}
      secondaryAction={{
        text: "Return to Homepage",
        href: "/"
      }}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Victorian Champions', link: '/victorian-champions' },
        { name: 'Not Found', link: '/victorian-champions' }
      ]}
      backgroundImage="/assets/img/bg/header-bg8.png"
    />
  )
}
