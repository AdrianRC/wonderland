import { Context } from '@nuxt/types'

type LangCode = 'nl' | 'en'

const IP_URL_BASE = 'https://www.ipinfo.io/?token='

export default ({ app, $config }: Context) => {
  const setLangAndRedirect = (lang: LangCode) => {
    app.i18n.setLocale(lang)
    app.router?.push(app.switchLocalePath(lang))
  }

  app.$axios
    .get(`${IP_URL_BASE}${$config.ipToken}`)
    .then(({ data }: { data: { country: string } }) => {
      if (data.country === 'NL') {
        setLangAndRedirect('nl')
      } else {
        setLangAndRedirect('en')
      }
    })
    .catch((err: string) => {
      console.error(err)
    })
}
