
const ExchangeAdapter = require('./adapter')

class FixerAdapter extends ExchangeAdapter {
  constructor () {
    super()
    this.API_ENDPOINT = 'http://api.fixer.io/latest'
  }
  getCurrencyCompareURL (base = 'USD', compare) {
    return this.API_ENDPOINT + `?symbols=${compare}&base=${base}`
  }

  async getPriceByCurrencyPrefix (base, compare) {
    compare = compare.toUpperCase()
    base = base.toUpperCase()
    const url = this.getCurrencyCompareURL(base, compare)
    const priceInfo = await this.fetchDataToCache(url)
    return {
      origin: 'fixer',
      primaryCurrency: compare,
      secondaryCurrency: base,
      value: priceInfo.rates[compare]
    }
  }
}

module.exports = FixerAdapter
