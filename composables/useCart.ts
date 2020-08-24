import { reactive, computed, useContext, ref } from '@nuxtjs/composition-api'
import { getPrice } from '@/utils/currency'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { Variant } from './useProduct'

interface Item {
  variant: Variant
  amount: number
}

interface Cart {
  items: Item[]
}

const cart = reactive<Cart>({ items: [] })

export const addItem = (variant: Variant, amount: number) => {
  const cartItem = cart.items.find((item) => item.variant.id === variant.id)
  if (cartItem) {
    cartItem.amount += amount
  } else {
    cart.items.push({ variant, amount })
  }
}

export const items = computed(() => cart.items)

export const total = computed(() => {
  const { app } = useContext()
  return cart.items.reduce((total, current) => {
    if (current.variant.prices) {
      return (
        total +
        current.amount *
          getPrice(current?.variant?.prices, app.i18n.locale as 'nl' | 'en')!
      )
    }
    return total
  }, 0)
})

export const getCheckoutURL = (locale: string) => {
  const lineItems = cart.items.map((item) => {
    return { variantId: item.variant.id, quantity: item.amount }
  })
  const currency = locale === 'nl' ? 'EUR' : 'USD'

  const { mutate: getUrl } = useMutation(
    gql`
      mutation checkoutCreate(
        $currency: CurrencyCode!
        $lineItems: [CheckoutLineItemInput!]
      ) {
        checkoutCreate(
          input: { presentmentCurrencyCode: $currency, lineItems: $lineItems }
        ) {
          checkout {
            webUrl
          }
        }
      }
    `,
    {
      variables: {
        currency,
        lineItems,
      },
    }
  )

  const checkoutUrl = ref('')

  getUrl()
    .then(
      ({ data }) => (checkoutUrl.value = data.checkoutCreate?.checkout?.webUrl)
    )
    .catch()
  return checkoutUrl
}
