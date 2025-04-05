import { useState } from 'preact/hooks'
import { Icon } from './ui/icon'

export default function EditorContent({
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole: Log error
      console.error('Fail to copy', err)
    }
  }

  return (
    <div className="h-[calc(100vh-48px)] border-r">
      <div className="relative h-full">
        <div className="absolute top-2 right-6 z-10 flex space-x-2">
          <button
            type="button"
            disabled={disabled}
            onClick={onReset}
            aria-label="Reset"
            className="bg-panel text-fg-muted inline-flex size-10 items-center justify-center rounded-md"
          >
            <Icon name="reset" />
          </button>
          <button
            type="button"
            onClick={copyToClipboard}
            className="bg-panel text-fg-muted inline-flex size-10 items-center justify-center rounded-md"
            aria-label="Copy"
            disabled={value.length === 0}
          >
            {copied ? <Icon name="check" /> : <Icon name="copy" />}
          </button>
        </div>
        <label>
          <span className="sr-only">Markdown raw editor</span>
          <textarea
            spellcheck={false}
            className="h-full w-full resize-none overflow-y-auto border-0 bg-transparent p-4 outline-none"
            value={value}
            onChange={e => handleChange(e.currentTarget.value)}
          />
        </label>
      </div>
    </div>
  )
}
