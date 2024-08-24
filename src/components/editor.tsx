import { useState } from 'react'
import { CheckIcon, CopyIcon, ResetIcon } from './icons'

export function EditorContent({
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
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(
        () => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1000)
        },
        err => {
          console.error('Error al copiar: ', err)
        },
      )
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = value
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
      } catch (err) {
        console.error('Error al copiar usando execCommand: ', err)
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <div className="h-[calc(100vh-48px)] border-r border-neutral-400/20">
      <div className="relative h-full">
        <div className="absolute right-6 top-2 z-10 flex space-x-2">
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
          className="h-full w-full resize-none overflow-y-auto border-0 bg-transparent p-4 outline-none"
          value={value}
          onChange={e => handleChange(e.target.value)}
        />
      </div>
    </div>
  )
}
