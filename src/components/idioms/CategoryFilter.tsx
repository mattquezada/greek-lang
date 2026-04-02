'use client'

interface Props {
  categories: string[]
  selected: string
  onSelect: (cat: string) => void
}

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {categories.map((cat) => {
        const isActive = cat === selected
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className="shrink-0 rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors"
            style={
              isActive
                ? { background: 'linear-gradient(135deg, #0D5EAF, #3b82d4)', color: '#fff', boxShadow: '0 0 16px rgba(13,94,175,0.4)' }
                : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(8px)', color: 'var(--muted-foreground)' }
            }
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
