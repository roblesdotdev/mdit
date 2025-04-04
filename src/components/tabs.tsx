import { cn } from '../lib/utils'

export type EditorTabs = 'editor' | 'preview'

export function Tabs({
  value,
  onChange,
}: {
  value: EditorTabs
  onChange: (val: EditorTabs) => void
}) {
  return (
    <div className="flex justify-center space-x-4 border-b p-2">
      <button
        type="button"
        className={cn(`rounded-md px-4 py-2`, value === 'editor' && 'bg-panel')}
        onClick={() => onChange('editor')}
      >
        Editor
      </button>
      <button
        type="button"
        className={cn(
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
