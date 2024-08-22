import { Outlet } from 'react-router-dom'
import 'highlight.js/styles/tokyo-night-dark.css'

export default function Root() {
  return (
    <div className="flex max-h-screen min-h-screen flex-col">
      <header className="h-[48px] bg-white/10">
        <div className="flex h-[inherit] w-full items-center justify-between px-4">
          <p className="read-the-docs text-sm text-neutral-400">
            Markdown Previewer Header
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/roblesdotdev/mdit"
            className="text-sm text-neutral-400 underline"
          >
            Source
          </a>
        </div>
      </header>
      <main className="flex flex-1">
        <Outlet />
      </main>
    </div>
  )
}
