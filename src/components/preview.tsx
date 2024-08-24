import { useEffect, useMemo, useState } from 'react'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export function PreviewContent({ raw }: { raw: string }) {
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
    <div className="h-[calc(100vh-48px)] overflow-y-auto border-r border-neutral-400/20">
      <div
        className="prose prose-invert w-full !max-w-none p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
