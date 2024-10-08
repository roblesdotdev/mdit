import clsx from 'clsx'
import localforage from 'localforage'
import { useEffect, useState } from 'react'
import { EditorContent } from '../components/editor'
import { PreviewContent } from '../components/preview'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../components/resizable'
import { useMediaQuery } from '../utils/hooks'

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

export default function Editor() {
  const [raw, setRaw] = useState('')
  const [tab, setTab] = useState<EditorTabs>('editor')
  const isMobile = useMediaQuery('(max-width: 768px)')

  const reset = () => {
    const userConfirm = window.confirm(
      'All content will be deleted? Are you sure?',
    )
    if (!userConfirm) return
    setRaw(demoContent)
  }

  useEffect(() => {
    const loadContent = async () => {
      const saved = await localforage.getItem<string>(STORAGE_KEY)
      if (saved) {
        setRaw(saved)
      } else {
        setRaw(demoContent)
      }
    }

    loadContent()
  }, [])

  useEffect(() => {
    const saveContent = async () => {
      try {
        await localforage.setItem(STORAGE_KEY, raw)
      } catch (error) {
        console.error('Error al guardar el contenido:', error)
      }
    }

    const debounceTimer = setTimeout(saveContent, 1000)
    return () => clearTimeout(debounceTimer)
  }, [raw])

  if (isMobile) {
    return (
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
    )
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={30}>
        <EditorContent
          onReset={reset}
          value={raw}
          handleChange={setRaw}
          disabled={raw === demoContent}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        className="h-[calc(100vh-48px)] overflow-y-auto"
        minSize={30}
      >
        <PreviewContent raw={raw} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

type EditorTabs = 'editor' | 'preview'

function Tabs({
  value,
  onChange,
}: {
  value: EditorTabs
  onChange: (val: EditorTabs) => void
}) {
  return (
    <div className="flex justify-center space-x-4 border-b p-2">
      <button
        className={clsx(
          `rounded-md px-4 py-2`,
          value === 'editor' && 'bg-panel',
        )}
        onClick={() => onChange('editor')}
      >
        Editor
      </button>
      <button
        className={clsx(
          `rounded-md px-4 py-2`,
          value === 'preview' && 'bg-panel',
        )}
        onClick={() => onChange('preview')}
      >
        Preview
      </button>
    </div>
  )
}
