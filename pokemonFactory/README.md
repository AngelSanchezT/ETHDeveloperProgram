# PokemonFactory
Este código es un contrato inteligente escrito en Solidity, el lenguaje de programación utilizado para desarrollar contratos inteligentes en la red de Ethereum. El SmartContrat se llama PokemonFactory, El contrato define la estructura de un "Pokemon" que contiene:

- id (unit) : identificador unico del poekmon.
- name (name) : nombre del pokemon.

### Variables Globales
Además, tiene una matriz de Pokemons llamada "pokemons", que se inicializa como privada y no se puede acceder desde fuera del contrato

También hay dos mapeos que se utilizan para asignar una dirección a cada Pokemon y un recuento de Pokemons por cada dirección.
- pokemonToOwner: El dueño del pokemon. mapping
- ownerPokemonCount: La cantidad de pokemones que tiene el propietario. mapping

### Funciones
- La función "createPokemon" se utiliza para agregar un nuevo Pokemon a la matriz "pokemons" y asignar el Pokemon al creador del mismo (la dirección que llama a la función).
- La función "getAllPokemons" devuelve la matriz completa de todos los Pokemons creados.

## Prerrequisitos

1. npm: Node Package Manager. para instalar, actualizar e instalar paquetes y dependencias para proyectos en Node.js
    
    ```jsx
    npm -v
    ```
    
2. NodeJS: Javascript runtime contruido en el engine Javascript de Chrome V8. Node.js website: [https://nodejs.org/](https://nodejs.org/).
    
    ```jsx
    node -v
    ```
    
3. Npx:
    
    ```jsx
    npx -v
    ```
## Creación del Proyecto:

1. Creación de la carpeta del proyecto.
    
    ```jsx
    mkdir pokemonFactory
    ```
    
2. Inicio de la configuración del proyecto con la configuración por defecto.
    
    ```jsx
    npm init
    ```
    
3. Instalación de Hardhat como dependencia de desarrollo en el proyecto.
    
    ```jsx
    npm install --save-dev hardhat
    ```
    
4. Instalar Hardhat en el proyecto
    
    ```jsx
    npx hardhat
    ```
    
5. Seleccionar el tipo de proyecto: Crear un proyecto vacío.
    
    [IMAGE]
    
6. Instalación del plugin de hardhat: complilar, testear.
    
    ```jsx
    npm install --save-dev @nomicfoundation/hardhat-toolbox
    ```
    
7. En el Archivo hardhat.config.js se adiciona la siguiente linea para importar hardhat-toolbox
    
    ```jsx
    require("@nomicfoundation/hardhat-toolbox")
    ```