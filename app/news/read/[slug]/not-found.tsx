import NotFoundPage from '@/components/elements/NotFoundPage'

export default function NotFound() {
  return (
    <NotFoundPage
      title="News Article Not Found"
      subtitle="404 - Article Not Found"
      description="The news article you're looking for doesn't exist or may have been removed."
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
        { name: 'Not Found', link: '/news' }
      ]}
      backgroundImage="/assets/img/bg/header-bg14.png"
    />
  )
}
