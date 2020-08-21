<template>
  <div>
    <div class="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
      <h1
        class="font-serif text-3xl text-center text-gray-900 text-bold lg:text-4xl"
      >
        {{ $t('collections') }}
      </h1>
      <hr />
    </div>
    <div
      class="grid grid-cols-1 gap-12 px-2 py-4 sm:grid-cols-2 sm:py-8 md:py-10 lg:grid-cols-3 lg:px-12 lg:py-14 lg:gap-x-16"
    >
      <div
        v-for="collection in collections"
        :key="collection.handle"
        class="space-y-4"
      >
        <img
          :src="collection.image.transformedSrc"
          :alt="collection.image.altText"
        />
        <h2 class="font-serif text-2xl font-medium text-center text-gray-900">
          {{ collection.title }}
        </h2>
        <div class="flex justify-center">
          <nuxt-link
            :to="localePath(`/collections/${collection.handle}`)"
            class="px-12 py-3 text-xs font-semibold text-gray-700 uppercase transition duration-150 border border-gray-300 hover:bg-gray-500 hover:border-gray-500 hover:text-white"
            >{{ $t('browse') }}</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useCollections from '@/composables/useCollections'

export default defineComponent({
  setup() {
    const { collections } = useCollections()
    return { collections }
  },
})
</script>
