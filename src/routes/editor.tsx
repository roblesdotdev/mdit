import localforage from 'localforage'
import { useEffect, useMemo, useState } from 'react'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { useMediaQuery } from '../utils/hooks'
import { CheckIcon, CopyIcon, ResetIcon } from '../components/icons'

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
    return <div className="w-full bg-neutral-200/5 p-4">Mobile Editor</div>
  }

  return (
    <div className="grid w-full flex-1 grid-cols-2 bg-neutral-200/5">
      <div className="h-[calc(100vh-48px)] border-r border-neutral-400/20">
        <EditorContent
          onReset={reset}
          value={raw}
          handleChange={setRaw}
          disabled={raw === demoContent}
        />
      </div>
      <div className="h-[calc(100vh-48px)] overflow-y-auto">
        <PreviewContent raw={raw} />
      </div>
    </div>
  )
}

function EditorContent({
  value,
  handleChange,
  onReset,
  disabled = false,
}: {
  value: string
  handleChange: (val: string) => void
  onReset: () => void
  disabled?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
      },
      err => {
        console.error('Error al copiar: ', err)
      },
    )
  }

  return (
    <div className="relative h-full">
      <div className="absolute right-2 top-2 z-10 flex space-x-2">
        <button
          disabled={disabled}
          onClick={onReset}
          className="inline-flex size-10 items-center justify-center rounded-md bg-black"
        >
          <ResetIcon />
        </button>
        <button
          onClick={copyToClipboard}
          className="inline-flex size-10 items-center justify-center rounded-md bg-black"
          disabled={value.length === 0}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <textarea
        spellCheck="false"
        className="h-full w-full resize-none overflow-auto border-0 bg-transparent p-4 outline-none"
        value={value}
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  )
}

function PreviewContent({ raw }: { raw: string }) {
  const [html, setHtml] = useState('')

  const processor = useMemo(() => {
    return unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeExternalLinks, {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
      })
      .use(rehypeStringify, { allowDangerousHtml: true })
  }, [])

  useEffect(() => {
    const processMarkdown = async () => {
      const result = await processor.process(raw)
      setHtml(result.toString())
    }

    processMarkdown()
  }, [raw, processor])

  return (
    <div
      className="prose prose-invert w-full !max-w-none p-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
