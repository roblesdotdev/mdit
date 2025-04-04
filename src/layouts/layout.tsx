import type { ComponentChildren } from 'preact'
import { Helmet } from 'react-helmet-async'

export default function Layout({
  title,
  description,
  children,
}: {
  title?: string
  description?: string
  children: ComponentChildren
}) {
  return (
    <>
      <Helmet
        titleTemplate="Mdit - %s"
        title={title}
        defaultTitle="Markdown Previewer"
        meta={[{ name: 'description', content: description }]}
        link={[{ rel: 'canonical', href: 'https://foo.com' }]}
      />
      {children}
    </>
  )
}
