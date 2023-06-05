// Despliegue es una función asincrona
const deploy = async () => {
    // getSigners() trae la información que traemos desde nuestra llave privada
    // deployer es un objeto que nos permite desplegar contratos a la red que tengamos configurada
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contract with the account:", deployer.address);
  
    // Definimos PlatziPunks en el contexto
    const PlatziPunks = await ethers.getContractFactory("PlatziPunks");
    // Instancia del contracto desplegado
    const deployed = await PlatziPunks.deploy();
  
    console.log("Platzi Punks is deployed at:", deployed.address);

    
  };
  
  // Llamando la función deploy()
  deploy()
    .then(() => process.exit(0))
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });