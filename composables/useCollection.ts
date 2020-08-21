import { computed } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

interface ProductStrings {
  handle: string
  title: string
  description: string
}

export type Price = { amount: number; currencyCode: string }
type ShopifyImage = { altText: string; transformedSrc: string }

interface RawProduct extends ProductStrings {
  images: {
    edges: { node: ShopifyImage }[]
  }
  presentmentPriceRanges: {
    edges: {
      node: { minVariantPrice: Price }
    }[]
  }
}

interface Product extends ProductStrings {
  images: ShopifyImage[]
  minPrices: Price[]
}

export default function useCollection(handle: string) {
  const { result } = useQuery(
    gql`
      query collectionByHandle($handle: String!) {
        collectionByHandle(handle: $handle) {
          title
          products(first: 10) {
            edges {
              node {
                handle
                title
                description
                images(first: 1) {
                  edges {
                    node {
                      altText
                      transformedSrc(maxWidth: 720)
                    }
                  }
                }
                presentmentPriceRanges(first: 5) {
                  edges {
                    node {
                      minVariantPrice {
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

  const title = computed<string>(() => result?.value?.collectionByHandle.title)

  const rawProducts = computed<RawProduct[]>(() =>
    result?.value?.collectionByHandle.products.edges.map(
      (edge: { node: RawProduct }) => edge.node
    )
  )

  const products = computed<Product[]>(() =>
    rawProducts.value?.map((product) => {
      return {
        description: product.description,
        handle: product.handle,
        images: product.images.edges.map((edge) => edge.node),
        minPrices: product.presentmentPriceRanges.edges.map(
          (edge) => edge.node.minVariantPrice
        ),
        title: product.title,
      }
    })
  )

  return { products, title }
}
