import NotFoundPage from '@/components/elements/NotFoundPage'

export default function NotFound() {
  return (
    <NotFoundPage
      title="Office Bearer Not Found"
      subtitle="404 - Office Bearer Not Found"
      description="The office bearer you're looking for doesn't exist or may have been removed."
      primaryAction={{
        text: "Back to Office Bearers",
        href: "/officebearers"
      }}
      secondaryAction={{
        text: "Return to Homepage",
        href: "/"
      }}
      breadcrumbs={[
        { name: 'Home', link: '/' },
        { name: 'Office Bearers', link: '/officebearers' },
        { name: 'Not Found', link: '/officebearers' }
      ]}
      backgroundImage="/assets/img/bg/header-bg7.png"
    />
  )
}
