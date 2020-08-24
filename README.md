# Wonderland Challenge

## Technical Details

This project makes use of:

- Nuxt.js (with Static Site Generation)
- TypeScript
- Tailwind CSS
- Vue Apollo
- The Composition API
- Shopify's Storefront API
- ipinfo's geolocation API

## Notable Features

This site contains your standard e-Commerce functionality: browsing collections, products with variations, creating a shopping cart and generating a checkout link.
It also includes i18n, with most of its limited content being available in both English and auto-translated Dutch.

The site also features geolocation through ipinfo's REST API. Upon receiving information of the user's location, the site will attempt to redirect to the Dutch version if the country code matches the Netherlands, and the US version in every other scenario.

It's common for adblockers to block IP-tracking requests so please make sure to disable your adblocker if you want to take a look at the redirect behavior.

The prices and currencies also change depending on the selected region. Dutch prices are in Euros and have an added 21% VAT, and US prices are in USD and are tax-exempt.
