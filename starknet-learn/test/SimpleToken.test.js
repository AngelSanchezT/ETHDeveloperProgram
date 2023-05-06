const { CairoTest } = require('starknet-connect')
const { SimpleToken } = require('../contracts')

describe('SimpleToken', function () {
  it('should transfer tokens correctly', async function () {
    const contract = await CairoTest.deploy(SimpleToken)
    await contract.transfer('0x1234567890123456789012345678901234567890', 100)

    const senderBalance = await contract.balanceOf('0x0123456789012345678901234567890123456789')
    assert.strictEqual(senderBalance, 900)

    const recipientBalance = await contract.balanceOf('0x1234567890123456789012345678901234567890')
    assert.strictEqual(recipientBalance, 100)
  })
})
