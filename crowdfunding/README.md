# Smart Contract para Crowdfunding <!-- omit in toc -->

En este curso construiremos un smart contract que nos permita hacer crowdfunding de proyectos usando Ether. Acompáñame para descubrir los detalles de este increíble proyecto.

## Contenido <!-- omit in toc -->

- [¿Qué es Crowdfunding?](#qué-es-crowdfunding)
  - [¿Cómo nuestro smart contract hará esto?](#cómo-nuestro-smart-contract-hará-esto)
  - [¿Y por qué hacer esto en Blockchain?](#y-por-qué-hacer-esto-en-blockchain)
- [Desafió sobre CrowdFunding](#desafió-sobre-crowdfunding)
- [Estructura del Proyecto](#estructura-del-proyecto)
  - [Test Unitarios](#test-unitarios)
  - [Configuración y dependencias](#configuración-y-dependencias)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

# ¿Qué es Crowdfunding?

Es un mecanismo que emplean proyectos/empresas para levantar capital en pequeñas cantidades hasta llegar a una meta especifica.

Los dueños del proyecto comparten de qué trata, cuál es la cantidad de dinero que quieren levantar y como invertirían este dinero.

Posteriormente publican el proyecto para que un gran número de personas realicen pequeños aportes hasta llegar a la meta objetivo de fundraising.

## ¿Cómo nuestro smart contract hará esto?

Los smart contracts permiten definir las reglas de negocio sin necesidad de un intermediario y definiendo la lógica y reglas de operación utilizando un código escrito.

Usando un smart contract definiremos cómo se crean los proyectos y cómo cualquier persona con una wallet dentro de Ethereum puede aportar Ether a un proyecto.

La cantidad de Ether que las personas aportarán a un proyecto será enviado a una wallet que corresponderá a los owners del proyecto, y se llevará la cuenta de la cantidad total aportada.

## ¿Y por qué hacer esto en Blockchain?

Gracias a las ventajas que ofrece Blockchain tendremos un sistema de crowdfunding confiable y seguro, pues cada uno de los aportes llegaran automáticamente a quién corresponde y, además, siempre habrá trazabilidad de cómo se distribuyen estos fondos.

# Desafió sobre CrowdFunding
Un CrowdFunding es un mecanismo colectivo de financiación de proyectos donde múltiples usuarios realizan aportes económicos a una cuenta con el fin de que esta reciba inversión y el proyecto se desarrolle.

Por lo general, y para evitar estafas, dichos proyectos se encuentran aprobados por una plataforma y poseen un libro blanco que describe el equipo y los objetivos del mismo. Los usuario que aportan capital suelen recibir incentivos en forma de tokens que pueden ser más valiosos en el futuro si el proyecto tiene éxito y recuperar la inversión.

Tu objetivo será desarrollar un contrato inteligente que permita:

- Inicializar el contrato y crea una `struct` para almacenar los datos de una proyecto y administra el estado de cada uno con un `enum`.
- Crear una función `fundProject()` que permita enviar ETH a un proyecto.
- Crear la función `changeProjectState()` que permita cambiar el estado de un proyecto.
- Utilizar `modifiers` para que solo el creador de un proyecto pueda modificarlo su estado.
- Producir validaciones en tu contrato para que no pueda aportarse capital a un proyecto finalizado o evitar que se aporte 0 ETH.
- Almacenar los proyectos en un _Array_ y guarda cada contribución que un proyecto reciba en un Mappings.

Al finalizar el reto, comparte tu primer contrato inteligente y compara tu solución con la de otros estudiantes. Recuerda que existen distintas maneras de resolver este reto.

# Estructura del Proyecto

La estructura del proyecto es la siguiente:

```
├── contracts/
│ ├── CrowdFunding.sol
│ └── ...
├── migrations/
│ ├── 01_deploy_contracts.js
├── test/
│ ├── CrowdFunding.test.js
│ └── ...
├── .gitignore
├── hardhat.config.js
├── package.json
└── README.md
```

El contrato inteligente se encuentra en la carpeta `contracts/` y se llama `CrowdFunding.sol`. Permite la creación de una campaña de recaudación de fondos y tiene los siguientes métodos:

`fundProject()`: Permite a los usuarios enviar Ether al contrato y donar a la campaña.
`changeProjectState(string newState)`: Permite al propietario del contrato cambiar el estado de la campaña (por ejemplo, de "Abierto" a "Cerrado").

## Test Unitarios
Se han creado test unitarios en la carpeta `tests/` para probar el contrato inteligente. Estos test han sido escritos utilizando el framework de testing `Hardhat`.

## Configuración y dependencias
Este proyecto utiliza `Solidity` y `Hardhat`. Además, se requiere una conexión a una red Ethereum local o remota para realizar pruebas.

# Instalación
Para instalar las dependencias del proyecto, utiliza el siguiente comando:

```sh
npm install
```

# Uso

Para ejecutar las pruebas, es necesario tener configurado el archivo `.env` con las variables de entorno necesarias. Luego, se pueden compilar y ejecutar las pruebas con el siguiente comando:

```sh
npx hardhat test
```

# Contribuciones

Las contribuciones son bienvenidas. Para proponer un cambio, se recomienda seguir los siguientes pasos:

1. Crear una nueva rama (`git checkout -b feature/nombre-del-cambio`)
2. Hacer los cambios necesarios
3. Hacer commit de los cambios (`git commit -am 'Agrega el cambio'`)
4. Hacer push de la rama (`git push origin feature/nombre-del-cambio`)
5. Abrir un Pull Request

# Licencia
Este proyecto se encuentra bajo la licencia GPL-3.0.
