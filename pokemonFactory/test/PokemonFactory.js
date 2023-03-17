const { expect } = require("chai");

describe("Pokemon contract", function () {
    it("Pokemon Factory shouldn't pokemons", async function () {

        // const [owner] = await ethers.getSigners(); // Esto lo ocuparán para crear un pokemon

        const PokemonFactory = await ethers.getContractFactory("PokemonFactory");

        const hardhatPokemon = await PokemonFactory.deploy();

        const pokemons = await hardhatPokemon.getAllPokemons();

        expect(pokemons.length).to.equal(0);

    });

    it("Create two pokemons in the pokemon factory", async function () {

        const PokemonFactory = await ethers.getContractFactory("PokemonFactory");

        const hardhatPokemon = await PokemonFactory.deploy();

        await hardhatPokemon.createPokemon( "bulbasaur", 1);
        await hardhatPokemon.createPokemon( "ivysaur", 2);

        const pokemons = await hardhatPokemon.getAllPokemons();

        expect(pokemons.length).to.equal(2);

    });

    it("Exception when creating a pokemon with id equal to 0", async function () {
        
        const PokemonFactory = await ethers.getContractFactory("PokemonFactory");
        const hardhatPokemon = await PokemonFactory.deploy();
        
        await expect( hardhatPokemon.createPokemon( "bulbasaur", 0 )).to.be.reverted;
        
    });

    it("Exception when creating a pokemon with a name less than 2 characters", async function () {

        const PokemonFactory = await ethers.getContractFactory("PokemonFactory");
        const hardhatPokemon = await PokemonFactory.deploy();
        
        await expect( hardhatPokemon.createPokemon( "", 1 )).to.be.reverted;
        await expect( hardhatPokemon.createPokemon( "a", 1 )).to.be.reverted;
        // await expect( hardhatPokemon.createPokemon( undefined, 1 )).to.be.reverted;
        // await expect( hardhatPokemon.createPokemon( null, 1 )).to.be.reverted;

    });


});