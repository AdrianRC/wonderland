import { computed } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

// TODO: Centralize types in a types/ folder.

interface ProductStrings {
  handle: string
  title: string
  description: string
}

export interface Variant {
  id: string
  title: string
  image: ShopifyImage
  prices: Price[]
}

interface RawDetailedProduct extends ProductStrings {
  id: string
  variants: {
    edges: {
      node: {
        id: string
        title: string
        image: ShopifyImage
        presentmentPrices: {
          edges: {
            node: {
              price: Price
            }
          }[]
        }
      }
    }[]
  }
}

interface ProductQueryResponse {
  productByHandle: RawDetailedProduct
}

export interface DetailedProduct extends ProductStrings {
  id: string
  variants: Variant[]
}

export type Price = { amount: number; currencyCode: 'EUR' | 'USD' }

type ShopifyImage = { altText: string; transformedSrc: string }

export default function useProduct(handle: string) {
  const { result } = useQuery<ProductQueryResponse>(
    gql`
      query productByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          variants(first: 10) {
            edges {
              node {
                id
                title
                image {
                  transformedSrc(maxWidth: 1080)
                  altText
                }
                presentmentPrices(first: 10) {
                  edges {
                    node {
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      handle,
    }
  )

  const rawProduct = computed<RawDetailedProduct>(
    () => result?.value?.productByHandle
  )

  const product = computed<DetailedProduct>(() => {
    const variants = rawProduct.value?.variants.edges.map((edge) => {
      const node = edge.node
      const prices = node.presentmentPrices.edges.map((edge) => edge.node.price)
      return {
        id: node.id,
        title: node.title,
        image: node.image,
        prices,
      }
    })
    return {
      ...rawProduct.value,
      variants,
    }
  })

  return { product }
}
