import { useMediaQuery } from '../utils/hooks'

export default function Editor() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return <div className="w-full bg-neutral-200/5 p-4">Mobile Editor</div>
  }

  return (
    <div className="grid w-full flex-1 grid-cols-2 bg-neutral-200/5">
      <div className="h-[calc(100vh-48px)] border-r border-neutral-400/20">
        <EditorContent />
      </div>
      <div className="h-[calc(100vh-48px)] overflow-y-auto">
        <PreviewContent />
      </div>
    </div>
  )
}

const demoContent = `# This is a title\n\nLorem ipsum`
const previewContent = `<h1>This is a title</h1><p>Lorem ipsum</p>`

function EditorContent() {
  return (
    <textarea
      className="h-full w-full resize-none overflow-auto border-0 bg-transparent p-4 outline-none"
      defaultValue={demoContent}
    />
  )
}

function PreviewContent() {
  return (
    <div
      className="h-full w-full p-4"
      dangerouslySetInnerHTML={{ __html: previewContent }}
    />
  )
}
