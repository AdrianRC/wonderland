<template>
  <div v-if="product" class="space-y-6">
    <div
      class="flex items-center justify-between w-full text-xl md:space-x-6 md:justify-end"
    >
      <h3 class="font-bold text-gray-800">Style:</h3>
      <div class="relative">
        <select
          v-model="selected"
          class="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
        >
          <option
            v-for="variant in product.variants"
            :key="variant.id"
            :value="variant"
            >{{ variant.title }}</option
          >
        </select>
        <div
          class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
        >
          <svg
            class="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="selected" class="space-y-12">
      <div class="space-y-6 lg:flex lg:space-x-12">
        <img
          :src="selected.image.transformedSrc"
          :alt="selected.image.altText"
          class="w-full lg:w-1/2"
        />
        <div class="space-y-6 lg:w-1/2 lg:space-y-10">
          <div>
            <h1 class="font-serif text-3xl text-gray-900">
              {{ selected.title }}
            </h1>
            <span class="text-xl text-gray-800">{{
              $n(getPrice(selected.prices, $i18n.locale), 'currency')
            }}</span>
          </div>
          <p class="text-gray-700">
            {{ product.description }}
          </p>
          <div class="flex self-end">
            <input
              v-model="selectedCount"
              aria-label="amount"
              type="number"
              max="10"
              min="1"
              step="1"
              class="w-1/2 px-4 py-2 border border-gray-400"
            />
            <button
              class="w-1/2 text-sm font-semibold text-white uppercase bg-black"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  watchEffect,
  watch,
  ref,
} from '@nuxtjs/composition-api'
import useProduct, { Variant } from '@/composables/useProduct'
import { getPrice } from '@/utils/currency'

export default defineComponent({
  setup() {
    const { params, app, query } = useContext()
    const { product } = useProduct(params.value.handle)
    const selected = ref<Variant>()
    const selectedCount = ref(1)

    watchEffect(() => {
      if (!selected.value && product.value?.variants) {
        if (query?.value?.style) {
          selected.value = product.value.variants.find(
            (product) => product.title === query.value.style
          )
        } else {
          selected.value = product.value.variants[0]
        }
      }
    })

    watch(selected, () => {
      if (selected && app.router) {
        app.router.push({ query: { style: selected?.value?.title } })
      }
    })

    return { product, selected, getPrice, selectedCount }
  },
})
</script>
