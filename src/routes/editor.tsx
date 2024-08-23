import localforage from 'localforage'
import { useEffect, useMemo, useState } from 'react'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { useMediaQuery } from '../utils/hooks'

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
          onClick={copyToClipboard}
          className="inline-flex size-10 items-center justify-center rounded-md bg-black"
        >
          {copied ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </button>
      </div>
      <textarea
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
