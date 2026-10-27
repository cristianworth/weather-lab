import { useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRight, LoaderCircle, MapPin, Search, X } from 'lucide-react'
import { searchLocations, type Location } from '../lib/weather'

export default function LocationSearch({
  onSelect,
}: {
  onSelect: (location: Location) => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Location[]>([])
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const root = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const id = useId()

  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  useEffect(() => {
    setResults([])
    setActive(-1)
    setError('')
    if (query.trim().length < 2) {
      setStatus('idle')
      return
    }
    const controller = new AbortController()
    setStatus('loading')
    const timer = setTimeout(async () => {
      try {
        const locations = await searchLocations(query, controller.signal)
        if (!controller.signal.aborted) {
          setResults(locations)
          setStatus('success')
        }
      } catch (failure) {
        if (!controller.signal.aborted) {
          setError(
            failure instanceof Error
              ? failure.message
              : 'Não foi possível buscar localidades.',
          )
          setStatus('error')
        }
      }
    }, 350)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  const select = (location: Location) => {
    onSelect(location)
    setQuery('')
    setOpen(false)
    setActive(-1)
  }
  const expanded = open && query.trim().length > 0

  return (
    <div
      className="location-search"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setOpen(false)
      }}
    >
      <Search size={19} aria-hidden="true" />
      <input
        ref={input}
        aria-label="Buscar cidade"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-controls={`${id}-results`}
        aria-activedescendant={
          expanded && active >= 0 ? `${id}-${active}` : undefined
        }
        placeholder="Qual cidade vamos explorar?"
        value={query}
        autoComplete="off"
        spellCheck={false}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false)
            return
          }
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
            setActive((index) => Math.min(index + 1, results.length - 1))
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActive((index) => Math.max(index - 1, 0))
          }
          if (event.key === 'Enter' && expanded && results[active]) {
            event.preventDefault()
            select(results[active])
          }
        }}
      />
      {query ? (
        <button
          className="icon-button search-clear"
          aria-label="Limpar busca"
          onClick={() => {
            setQuery('')
            input.current?.focus()
          }}
        >
          <X size={16} />
        </button>
      ) : (
        <span className="search-hint">Buscar</span>
      )}
      {expanded && (
        <div className="search-dropdown">
          <div role="status" className="search-status">
            {query.trim().length < 2 ? (
              'Digite pelo menos 2 caracteres.'
            ) : status === 'loading' ? (
              <>
                <LoaderCircle size={15} className="spin" /> Buscando
                localidades…
              </>
            ) : status === 'error' ? (
              error
            ) : results.length ? (
              'Selecione uma localidade'
            ) : (
              'Nenhuma localidade encontrada. Tente outro nome.'
            )}
          </div>
          <ul
            id={`${id}-results`}
            role="listbox"
            aria-label="Localidades encontradas"
          >
            {results.map((location, index) => (
              <li
                key={location.id}
                id={`${id}-${index}`}
                role="option"
                aria-selected={active === index}
                onPointerMove={() => setActive(index)}
              >
                <button
                  tabIndex={-1}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => select(location)}
                >
                  <span className="search-pin">
                    <MapPin size={18} />
                  </span>
                  <span>
                    <strong>{location.name}</strong>
                    <small>
                      {[location.region, location.country]
                        .filter(Boolean)
                        .join(', ')}
                    </small>
                  </span>
                  <ArrowUpRight size={16} />
                </button>
              </li>
            ))}
          </ul>
          <div className="search-footer">
            Localidades pelo GeoNames · ↑ ↓ para navegar · Enter para selecionar
          </div>
        </div>
      )}
    </div>
  )
}
