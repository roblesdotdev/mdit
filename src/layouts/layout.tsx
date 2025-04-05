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
        meta={[
          {
            name: 'description',
            content:
              description ||
              'A simple and efficient Markdown editor with real-time preview. Perfect for writers, developers, and content creators.',
          },
          {
            name: 'keywords',
            content:
              'Markdown, Markdown editor, mdit, text editor, Markdown preview, Markdown live',
          },
          { name: 'author', content: 'Aldo R. Robles' },

          // Open Graph
          {
            property: 'og:title',
            content: 'Mdit - Simple and Efficient Markdown Editor',
          },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: 'https://mdit.pages.dev' },
          {
            property: 'og:description',
            content:
              'Discover Mdit, a user-friendly Markdown editor with real-time preview. Perfect for anyone looking to write and format text quickly and efficiently.',
          },
          { property: 'og:image', content: '/og-image.png' },

          // Twitter
          { name: 'twitter:card', content: 'summary_large_image' },
          {
            name: 'twitter:title',
            content: 'Mdit - Simple and Efficient Markdown Editor',
          },
          {
            name: 'twitter:description',
            content:
              'Discover Mdit, a user-friendly Markdown editor with real-time preview. Perfect for anyone looking to write and format text quickly and efficiently.',
          },
          { name: 'twitter:creator', content: '@roblesdotdev' },
          { name: 'twitter:image', content: '/og-image.png' },
        ]}
        link={[{ rel: 'canonical', href: 'https://mdit.pages.dev' }]}
      />

      <div className="flex max-h-screen min-h-screen flex-col">
        <header className="h-[48px] border-b">
          <div className="flex h-[inherit] w-full items-center justify-between px-4">
            <p className="read-the-docs text-fg-muted text-sm">
              Mdit | Markdown Previewer
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/roblesdotdev/mdit"
              className="text-fg-muted text-sm underline"
            >
              Source
            </a>
          </div>
        </header>
        {children}
      </div>
    </>
  )
}
