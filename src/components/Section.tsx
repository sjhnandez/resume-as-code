import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  index: string
  title: string
  /** Stack the heading above the content so it gets the full page width. */
  wide?: boolean
  children: ReactNode
}

export function Section({ id, index, title, wide = false, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="mx-auto max-w-[75rem] px-5 sm:px-8">
        <div
          className={`border-t border-ink py-10 sm:py-14 ${
            wide ? '' : 'grid gap-8 md:grid-cols-12 md:gap-6'
          }`}
        >
          <Reveal className={wide ? 'mb-8 flex items-baseline gap-4 sm:mb-10' : 'md:col-span-3'}>
            <p className="label">{index}</p>
            <h2 className={`font-display text-4xl leading-none sm:text-5xl ${wide ? '' : 'mt-3'}`}>
              {title}
            </h2>
          </Reveal>
          <div className={wide ? '' : 'md:col-span-9'}>{children}</div>
        </div>
      </div>
    </section>
  )
}
