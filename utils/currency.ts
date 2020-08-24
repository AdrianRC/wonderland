import { Price } from '@/composables/useCollection'

export const VAT_TAX = 1.21

export const localeCurrencyMap = {
  en: 'USD',
  nl: 'EUR',
}

export function getPrice(minPriceArray: Price[], locale: 'en' | 'nl') {
  const price = minPriceArray.find(
    (price) => price.currencyCode === localeCurrencyMap[locale]
  )
  if (price) return addTax(price)
}

export function addTax(price: Price) {
  if (price?.currencyCode === 'EUR') {
    return price.amount * VAT_TAX
  }
  return price?.amount
}
