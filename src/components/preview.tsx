import { useEffect, useMemo, useState } from 'preact/hooks'
import rehypeStringify from 'rehype-stringify'
import { remark } from 'remark'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'

export function PreviewContent({ raw }: { raw: string }) {
  const [html, setHtml] = useState('')

  const processor = useMemo(() => {
    return remark()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: inner markdown
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
