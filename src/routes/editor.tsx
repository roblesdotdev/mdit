import { useState } from 'react'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { useMediaQuery } from '../utils/hooks'

const demoContent = `# This is a title\n\nLorem ipsum`

export default function Editor() {
  const [raw, setRaw] = useState(demoContent)
  const isMobile = useMediaQuery('(max-width: 768px)')

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
      defaultValue={value}
      onChange={e => handleChange(e.target.value)}
    />
  )
}

function PreviewContent({ raw }: { raw: string }) {
  return (
    <div className="prose prose-invert w-full !max-w-none p-4">
      <Markdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>{raw}</Markdown>
    </div>
  )
}
