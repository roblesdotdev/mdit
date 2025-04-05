import { useEffect, useState } from 'preact/hooks'
import { EditorTabs, Tabs } from '../components/tabs'
import Layout from '../layouts/layout'
import { useMediaQuery } from '../lib/hooks'
import { Suspense, lazy } from 'preact/compat'

const PreviewContent = lazy(() => import('../components/preview.tsx'))
const EditorContent = lazy(() => import('../components/editor.tsx'))

const InitialPlaceholder = () => (
  <div className="bg-panel h-full w-full animate-pulse p-4">
    <p>Loading...</p>
  </div>
)

const STORAGE_KEY = 'markdown-editor-content'

const demoContent = `## Mdit\n
Welcome to **Mdit**, a simple Markdown previewer written with React and Vite.\n
\`\`\`javascript
const foo = "FontWithASyntaxHighlighter is awesome!";
\`\`\`\n
<details>
  <summary>Open me</summary>
  <a href="https://github.com/roblesdotdev/mdit">source code</a>
</details>
`

export default function HomePage() {
  const [raw, setRaw] = useState<string>('')
  const [tab, setTab] = useState<EditorTabs>('editor')
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const loadSaveContent = () => {
      const saved = localStorage.getItem(STORAGE_KEY)
      setRaw(saved || demoContent)
    }

    loadSaveContent()
  }, [])

  useEffect(() => {
    const saveContent = () => {
      try {
        localStorage.setItem(STORAGE_KEY, raw)
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: Log failure
        console.error('Fail to save', error)
      }
    }

    const debounceTimer = setTimeout(saveContent, 1000)
    return () => clearTimeout(debounceTimer)
  }, [raw])

  const reset = () => {
    const userConfirm = window.confirm(
      'All content will be deleted? Are you sure?',
    )
    if (!userConfirm) return
    setRaw(demoContent)
  }

  const renderEditor = () => (
    <Suspense fallback={<InitialPlaceholder />}>
      <EditorContent
        onReset={reset}
        value={raw}
        handleChange={setRaw}
        disabled={raw === demoContent}
      />
    </Suspense>
  )

  const renderPreview = () => (
    <Suspense fallback={<InitialPlaceholder />}>
      <PreviewContent raw={raw} />
    </Suspense>
  )

  return (
    <Layout title="Markdown Previewer" description="Markdown live edit.">
      {isMobile ? (
        <div className="flex h-full w-full flex-col">
          <Tabs value={tab} onChange={v => setTab(v)} />
          {tab === 'editor' ? renderEditor() : renderPreview()}
        </div>
      ) : (
        <div className="grid h-[calc(100vh-48px)] grid-cols-2">
          {renderEditor()}
          {renderPreview()}
        </div>
      )}
    </Layout>
  )
}
