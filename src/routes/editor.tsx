import { useEffect, useMemo, useState } from 'react'
import { useMediaQuery } from '../utils/hooks'
import localforage from 'localforage'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSanitize from 'rehype-sanitize'

const STORAGE_KEY = 'markdown-editor-content'

const demoContent = `# This is a title\n\nLorem ipsum`

export default function Editor() {
  const [raw, setRaw] = useState('')
  const isMobile = useMediaQuery('(max-width: 768px)')

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
        <EditorContent value={raw} handleChange={setRaw} />
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
}: {
  value: string
  handleChange: (val: string) => void
}) {
  return (
    <textarea
      className="h-full w-full resize-none overflow-auto border-0 bg-transparent p-4 outline-none"
      value={value}
      onChange={e => handleChange(e.target.value)}
    />
  )
}

function PreviewContent({ raw }: { raw: string }) {
  const [html, setHtml] = useState('')

  const processor = useMemo(() => {
    return unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeStringify)
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
