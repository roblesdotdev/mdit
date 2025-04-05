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
        ]}
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
