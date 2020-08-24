<template>
  <div class="space-y-6">
    <img src="@/assets/skater.jpg" alt="skater standing showing their socks" />
    <img
      class="lg:hidden"
      src="@/assets/skater.jpg"
      alt="skater standing showing their socks"
    />
    <img
      class="sm:hidden"
      src="@/assets/skater.jpg"
      alt="skater standing showing their socks"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {},
})
</script>
