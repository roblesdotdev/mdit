import { useEffect, useState } from 'preact/hooks'
import { EditorContent } from '../components/editor'
import { PreviewContent } from '../components/preview'
import { EditorTabs, Tabs } from '../components/tabs'
import Layout from '../layouts/layout'
import { useMediaQuery } from '../lib/hooks'

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

export function HomePage() {
  const [raw, setRaw] = useState<string>('')
  const [tab, setTab] = useState<EditorTabs>('editor')
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setRaw(saved)
    } else {
      setRaw(demoContent)
    }
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

  if (isMobile) {
    return (
      <Layout>
        <div className="flex h-full w-full flex-col">
          <Tabs value={tab} onChange={v => setTab(v)} />
          {tab === 'editor' ? (
            <EditorContent
              onReset={reset}
              value={raw}
              handleChange={setRaw}
              disabled={raw === demoContent}
            />
          ) : (
            <PreviewContent raw={raw} />
          )}
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Markdown Previewer" description="Markdown live edit.">
      <div className="grid grid-cols-2">
        <EditorContent
          onReset={reset}
          value={raw}
          handleChange={setRaw}
          disabled={raw === demoContent}
        />
        <PreviewContent raw={raw} />
      </div>
    </Layout>
  )
}
