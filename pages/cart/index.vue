<template>
  <div class="space-y-8">
    <h1
      class="font-serif text-3xl text-center text-gray-900 text-bold lg:text-4xl"
    >
      {{ $t('cart') }}
    </h1>
    <div v-if="items.length" class="space-y-8">
      <div class="grid items-center grid-cols-4 gap-4 text-center">
        <span></span>
        <span class="font-bold">{{ $t('product') }}</span>
        <span class="font-bold">{{ $t('quantity') }}</span>
        <span class="font-bold">{{ $t('price') }}</span>
        <template v-for="item in items">
          <img
            :key="`${item.variant.id}--image`"
            class="lg:h-26"
            :src="item.variant.image.transformedSrc"
            :alt="item.variant.image.altText"
          />
          <span :key="`${item.variant.id}--title`">{{
            item.variant.title
          }}</span>
          <span :key="`${item.variant.id}--amount`">{{ item.amount }}</span>
          <span :key="`${item.variant.id}--price`">{{
            $n(getPrice(item.variant.prices, $i18n.locale), 'currency')
          }}</span>
          <hr
            :key="`${item.variant.id}--divider`"
            class="col-span-4 col-start-1"
          />
        </template>
      </div>
      <div class="flex items-center gap-4">
        <span class="w-1/2 text-right"
          >{{ $t('total') }}: {{ $n(total, 'currency') }}</span
        >
        <button
          class="w-1/2 p-2 text-sm font-semibold text-white uppercase transition duration-300 bg-black border-2 border-black hover:bg-white hover:text-black"
          @click.stop.prevent="goToCheckout"
        >
          {{ $t('checkout') }}
        </button>
      </div>
    </div>
    <h2
      v-else
      class="p-10 mx-10 text-3xl font-semibold text-center border border-gray-400 text-middle"
    >
      {{ $t('emptyCart') }}
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { items, total, getCheckoutURL } from '@/composables/useCart'
import { getPrice } from '@/utils/currency'

export default defineComponent({
  setup() {
    const { app } = useContext()

    // Due to a bug on the current version of vue-apollo
    // getCheckoutURL (or anything that depends on mutations) cannot be called
    // outside the initial setup, thus limiting the cart from being modified
    // inside this page.
    const checkoutUrl = getCheckoutURL(app.i18n.locale)

    const goToCheckout = () => {
      window.location.href = checkoutUrl.value
    }

    return {
      items,
      getPrice,
      total,
      goToCheckout,
    }
  },
})
</script>
