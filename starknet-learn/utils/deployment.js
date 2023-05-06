const { Cairo } = require('starknet-connect')
const { SimpleToken } = require('../contracts')

const starknetEndpoint = 'https://api.starknet.io'
const privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'

async function deploy () {
  const cairo = new Cairo(starknetEndpoint, privateKey)
  const contract = await cairo.deploy(SimpleToken)
  console.log('Contract deployed to:', contract.contractAddress)
}

deploy()
