import NotFoundPage from '@/components/elements/NotFoundPage'

export default function NotFound() {
  return (
    <NotFoundPage
      title="Page Not Found"
      subtitle="404 - Page Not Found"
      description="The page you're looking for doesn't exist or may have been moved."
      primaryAction={{
        text: "Return to Homepage",
        href: "/"
      }}
      secondaryAction={{
        text: "Browse Our Site",
        href: "/about"
      }}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Page Not Found', link: '#' }
      ]}
      backgroundImage="/assets/img/bg/header-bg9.png"
    />
  )
}
