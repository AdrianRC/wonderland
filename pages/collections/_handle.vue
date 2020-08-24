<template>
  <div>
    <div class="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
      <h1
        class="font-serif text-3xl text-center text-gray-900 text-bold lg:text-4xl"
      >
        {{ title }}
      </h1>
      <hr />
    </div>
    <div
      class="grid grid-cols-1 gap-12 px-2 py-4 sm:grid-cols-2 sm:py-8 md:py-10 lg:grid-cols-3 lg:px-12 lg:py-14 lg:gap-x-16"
    >
      <div
        v-for="product in products"
        :key="product.handle"
        class="p-4 space-y-2 shadow-md"
      >
        <img
          :src="product.images[0].transformedSrc"
          :alt="product.images[0].altText"
        />
        <div class="space-y-6">
          <div class="space-y-4">
            <div>
              <h2 class="font-serif text-2xl font-medium text-gray-900">
                {{ product.title }}
              </h2>
              <span class="text-sm text-gray-600">{{
                $n(getPrice(product.minPrices, $i18n.locale), 'currency')
              }}</span>
            </div>
            <p class="leading-snug text-gray-700">{{ product.description }}</p>
          </div>

          <div class="flex justify-end">
            <nuxt-link
              :to="localePath(`/product/${product.handle}`)"
              class="px-12 py-3 text-xs font-semibold text-gray-700 uppercase transition duration-150 border border-gray-900 hover:bg-gray-900 hover:border-gray-900 hover:text-white"
              >{{ $t('browse') }}</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import useCollection from '@/composables/useCollection'
import { getPrice } from '@/utils/currency'

export default defineComponent({
  setup() {
    const { params } = useContext()
    const { products, title } = useCollection(params.value.handle)
    return { products, title, getPrice }
  },
})
</script>
