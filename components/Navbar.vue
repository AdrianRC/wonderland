<template>
  <nav
    class="flex items-center justify-between text-lg text-gray-800 uppercase md:text-xl"
  >
    <div class="space-x-4 sm:space-x-6 md:space-x-8 lg:w-1/4">
      <Navlink :to="localePath('/')">{{ $t('home') }}</Navlink>
      <Navlink :to="localePath('collections')">{{ $t('collections') }}</Navlink>
    </div>
    <div
      class="items-center hidden text-center lg:flex lg:w-1/2 lg:justify-center"
    >
      <nuxt-link
        class="text-3xl font-bold text-purple-500 duration-500 ease-in-out transform hover:scale-125"
        :to="localePath('/')"
        >WONDERLAND</nuxt-link
      >
    </div>
    <div
      class="flex items-center space-x-4 sm:space-x-6 md:space-x-8 lg:w-1/4 lg:justify-end"
    >
      <Navlink :to="switchLocalePath('nl')">NL</Navlink>
      <Navlink :to="switchLocalePath('en')">EN</Navlink>
      <nuxt-link :to="localePath('/cart')">
        <svg
          class="inline-block w-8 h-8 text-purple-500 duration-500 ease-in-out transform cursor-pointer fill-current hover:scale-125"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M4 2h16l-3 9H4a1 1 0 100 2h13v2H4a3 3 0 010-6h.33L3 5 2 2H0V0h3a1 1 0 011 1v1zm1 18a2 2 0 110-4 2 2 0 010 4zm10 0a2 2 0 110-4 2 2 0 010 4z"
          />
        </svg>
      </nuxt-link>
    </div>
  </nav>
</template>
