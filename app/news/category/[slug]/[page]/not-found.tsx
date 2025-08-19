import NotFoundPage from '@/components/elements/NotFoundPage'

export default function NotFound() {
  return (
    <NotFoundPage
      title="News Category Not Found"
      subtitle="404 - Category Not Found"
      description="The news category you're looking for doesn't exist or may have been moved."
      primaryAction={{
        text: "Browse All News",
        href: "/news"
      }}
      secondaryAction={{
        text: "Return to Homepage",
        href: "/"
      }}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'News & Updates', link: '/news' },
        { name: 'Category', link: '/news' },
        { name: 'Not Found', link: '/news' }
      ]}
      backgroundImage="/assets/img/bg/header-bg14.png"
    />
  )
}
