import NotFoundPage from '@/components/elements/NotFoundPage'

export default function NotFound() {
  return (
    <NotFoundPage
      title="News Hashtag Not Found"
      subtitle="404 - Hashtag Not Found"
      description="The news hashtag you're looking for doesn't exist or may have been moved."
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
        { name: 'Hashtags', link: '/news' },
        { name: 'Not Found', link: '/news' }
      ]}
      backgroundImage="/assets/img/bg/header-bg14.png"
    />
  )
}
