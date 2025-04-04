import type { SVGProps } from 'preact/compat'
import { cn } from '../../lib/utils'
import spriteHref from './icons/sprite.svg'
import { IconName } from './icons/types'

export function Icon({
  name,
  title,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
}) {
  return (
    <svg {...props} className={cn('size-5 text-current', className)}>
      <title>{title || name}</title>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  )
}
