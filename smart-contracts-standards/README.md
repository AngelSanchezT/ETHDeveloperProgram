# Reto Smart Contract Standards - Platzi - ETH Dev Program

Este proyecto muestra el uso básico de la librería de contratos de OpenZeppelin.

## Table of content
- [Descripción](#descripción)
- [Cristerio de aceptación](#criterio-de-aceptación)
- [Documentación](#📄-documentación)


## Descripción:
**Punto 1:** De la lista de Smart Contracts Weekness Clasification, selecciona 2 vulnerabilidades que te parecieron interesantes y describe la o las soluciones propuestas.
**Punto 2:** Implementa un contrato inteligente que use la libreria de contratos de OpenZeppelin, debe utilizar alguno de los contratos que implementa un estandar ERC y un contrato adicional de tu preferencia de la librería, describe porque elegiste estos contratos.

## Criterio de aceptación:
- [ ] Documento especificando las vulnerabilidades seleccionadas y sus soluciones
- [ ] Link a repositorio de github con la implementacion de una de las soluciones
  - [ ] Contrato
  - [ ] Pruebas 
  - [ ] Descripcion de la elección

> Esta compuesto por un contrato de ejemplo `contracts/MyToken.sol`, un test para el contrato en `test/MyToken.js` y un script para desplegar el contrato `scripts/deploy.js` en la red de prueba.


# 📄 Documentación
#### Estructura de un contracto inteligente

Vamos a desglosar los diferentes componentes de un contrato inteligente:

- **Pragma:** esta es una directiva del compilador que especifica la versión de Solidity utilizada en el contrato. Por lo general, se incluye al comienzo del código del contrato.

- **Definición de contrato:** este es el cuerpo principal del contrato, que contiene las variables de estado, los eventos, el constructor y las funciones. El contrato se define mediante la palabra clave contract, seguida del nombre del contrato.

- **Variables de estado:** Estas son variables que almacenan el estado del contrato, y pueden ser leídas y modificadas por funciones dentro del contrato. En este ejemplo, tenemos una variable de estado myVariable de tipo uint256.

- **Eventos:** Sirven para emitir señales del contrato que pueden ser captadas por aplicaciones externas. En este ejemplo, tenemos un evento MyEvent que se emite cada vez que se cambia el valor de myVariable.

- **Constructor:** esta es una función especial que se llama cuando el contrato se implementa en la cadena de bloques y se usa para inicializar las variables de estado del contrato. En este ejemplo, tenemos un constructor que establece el valor inicial de myVariable.

- **Funciones:** Estas se utilizan para definir el comportamiento del contrato, y pueden ser llamadas externamente por otros contratos o aplicaciones. En este ejemplo, tenemos una función setVariable que modifica el valor de myVariable y emite el evento MyEvent.

**Ejemplo:**

```javascript
pragma solidity ^0.8.9;  // especifica la version de Solidity usada en el contrato

contract MyContract {
    // variables de estado
    uint256 public myVariable;

    // eventos
    event MyEvent(uint256 indexed myValue);

    // constructor
    constructor(uint256 initialValue) {
        myVariable = initialValue;
    }

    // funciones
    function setVariable(uint256 newValue) public {
        myVariable = newValue;
        emit MyEvent(myVariable);
    }
}
```

#### Como usar la librería de contratos de OpenZeppelin

**Instala OpenZeppelin:** Puedes instalar OpenZeppelin usando `npm` o `yarn`. También puedes descargar el código fuente directamente desde GitHub. Para instalar OpenZeppelin a través de `npm`, puede usar el siguiente comando:

```bash
npm install @openzeppelin/contracts
```

**Importe la librería:** una vez que se instala OpenZeppelin, puedes importar los contratos que deseas usar en tu contrato inteligente de Solidity. Puede hacerlo agregando una declaración de importación en la parte superior de su archivo Solidity. Por ejemplo, para importar el contrato ERC20 de OpenZeppelin, agregaría la siguiente declaración de importación:

```javascript
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

**Heredar la librería en mi contrato:** después de importar la librería, puedes usar su funcionalidad al heredarla desde tu contrato. Por ejemplo, para crear un nuevo token ERC20, puede crear un nuevo contrato que herede del contrato ERC20:

```javascript
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("My Token", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}
```