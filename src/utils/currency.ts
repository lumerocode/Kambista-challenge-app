import type { CurrencyCode } from '../types/exchange'

export function parseCurrencyValue(value: string): number {
  const normalized = value.replace(/,/g, '').trim()
  if (!normalized || normalized === '.') return 0
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

export function sanitizeCurrencyInput(raw: string): string {
  let cleaned = raw.replace(/[^\d.]/g, '')
  const dotIndex = cleaned.indexOf('.')
  if (dotIndex !== -1) {
    const intPart = cleaned.slice(0, dotIndex)
    const decPart = cleaned.slice(dotIndex + 1).replace(/\./g, '').slice(0, 2)
    cleaned = `${intPart}.${decPart}`
  }
  return cleaned
}

export function formatCurrencyAmount(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export function formatCurrencyLabel(value: number, currency: CurrencyCode): string {
  const symbol = currency === 'USD' ? '$' : 'S/'
  return `${symbol} ${formatCurrencyAmount(value)}`
}

export function formatInputDisplay(raw: string, focused: boolean): string {
  if (focused) {
    return raw === '' ? '' : sanitizeCurrencyInput(raw)
  }
  return formatCurrencyAmount(parseCurrencyValue(raw))
}
