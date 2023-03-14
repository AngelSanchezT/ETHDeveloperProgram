# PokemonFactory


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