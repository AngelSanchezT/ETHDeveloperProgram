# 🔴 Starknet Learn

Un proyecto educativo para aprender a desarrollar en StarkNet. Incluye tutoriales, desafíos y proyectos prácticos para ayudar a los desarrolladores a familiarizarse con la tecnología.

# SimpleToken
SimpleToken es un contrato inteligente escrito en Cairo que implementa un token ERC-20 básico. El contrato tiene una cantidad fija de tokens que se pueden transferir entre cuentas.

## Uso
Para usar el contrato, primero debes desplegarlo en la red de StarkNet. Puedes hacerlo utilizando la herramienta starknet-connect de la siguiente manera:

```
const { Cairo } = require('starknet-connect')
const { SimpleToken } = require('./contracts')

const starknetEndpoint = 'https://api.starknet.io'
const privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'

async function deploy () {
  const cairo = new Cairo(starknetEndpoint, privateKey)
  const contract = await cairo.deploy(SimpleToken)
  console.log('Contract deployed to:', contract.contractAddress)
}

deploy()
```

Una vez que el contrato esté desplegado, puedes interactuar con él utilizando las funciones de la interfaz ERC-20. Por ejemplo, para transferir tokens desde una cuenta a otra, puedes utilizar la función transfer:

```
const { Cairo } = require('starknet-connect')
const { SimpleToken } = require('./contracts')

const starknetEndpoint = 'https://api.starknet.io'
const privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'

async function transferTokens () {
  const cairo = new Cairo(starknetEndpoint, privateKey)
  const contract = await cairo.contractAtAddress(SimpleToken, '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef')

  // Transfer 100 tokens from the sender to the recipient
  await contract.transfer('0x1234567890123456789012345678901234567890', 100)
}

transferTokens()
```

## Funciones
El contrato implementa las siguientes funciones de la interfaz ERC-20:

`name()`
Devuelve el nombre del token.

`symbol()`
Devuelve el símbolo del token.

`decimals()`
Devuelve la cantidad de decimales utilizados por el token.

`totalSupply()`
Devuelve la cantidad total de tokens en circulación.

`balanceOf(address account)`
Devuelve la cantidad de tokens que tiene una cuenta específica.

`transfer(address recipient, uint256 amount)`
Transfiere una cantidad de tokens desde la cuenta del remitente a la cuenta del destinatario.

`allowance(address owner, address spender)`
Devuelve la cantidad de tokens que el propietario de la cuenta ha permitido a un determinado gastador gastar en su nombre.

`approve(address spender, uint256 amount)`
Permite a un gastador gastar una cantidad específica de tokens en nombre del propietario de la cuenta.

`transferFrom(address sender, address recipient, uint256 amount)`
Transfiere una cantidad de tokens desde la cuenta del remitente a la cuenta del destinatario, siempre que el remitente haya permitido al gastador gastar esa cantidad de tokens en su nombre.