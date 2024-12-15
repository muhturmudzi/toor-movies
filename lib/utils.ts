import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getYear(date: string) {
  if (!date) return

  return new Date(date).getFullYear()
}

export function formatDate(date: string) {
  if (!date) return

  const dateTobeFormatted = new Date(date)

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long'
  }).format(dateTobeFormatted)
}

export function formatCurrencies(value: number) {
  if (!value) return 0

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(value)
}