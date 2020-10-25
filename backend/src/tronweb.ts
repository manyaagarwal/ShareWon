const TronWeb = require('tronweb')

const provider = 'https://api.shasta.trongrid.io/';

export const tronWeb = new TronWeb({
    fullHost: provider,
  })
