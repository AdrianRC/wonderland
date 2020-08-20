import { Context } from '@nuxt/types'
import { provide, onGlobalSetup } from '@nuxtjs/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'

/**
 * This plugin will connect @nuxt/apollojs with @vue/apollo-composable
 */
export default ({ app }: Context): void => {
  onGlobalSetup(() => {
    provide(DefaultApolloClient, app.apolloProvider?.defaultClient)
  })
}
