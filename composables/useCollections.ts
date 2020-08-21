import { computed } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

interface Collection {
  handle: string
  title: string
  image: {
    altText: string
    transformedSrc: string
  }
}

interface Wrapper {
  node: Collection
}

export default function useCollections() {
  const { result } = useQuery(gql`
    {
      collections(first: 10) {
        edges {
          node {
            handle
            title
            image {
              altText
              transformedSrc(maxWidth: 720)
            }
          }
        }
      }
    }
  `)
  const wrappers = computed<Wrapper[]>(() => result?.value?.collections.edges)
  const collections = computed<Collection[]>(() =>
    wrappers.value?.map((wrapper: Wrapper) => wrapper.node)
  )
  return { collections }
}
