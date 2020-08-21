<template>
  <nuxt-link
    class="transition duration-150 ease-in-out border-b border-white hover:border-black"
    :to="to"
  >
    <slot></slot>
  </nuxt-link>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
