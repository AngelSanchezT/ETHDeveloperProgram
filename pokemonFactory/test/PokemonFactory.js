const { expect } = require("chai");

describe("Pokemon contract", function () {
    it("Pokemon Factory shouldn't pokemons", async function () {

        // const [owner] = await ethers.getSigners(); // Esto lo ocuparán para crear un pokemon

        const PokemonFactory = await ethers.getContractFactory("PokemonFactory");

        const hardhatPokemon = await PokemonFactory.deploy();

        const pokemons = await hardhatPokemon.getAllPokemons();

        expect(pokemons.length).to.equal(0);

    });

    it("Challenge 1 - Create two pokemons in the pokemon factory", async function () {

        const PokemonFactory = await ethers.getContractFactory("PokemonFactory");

        const hardhatPokemon = await PokemonFactory.deploy();

        await hardhatPokemon.createPokemon( "bulbasaur", 1, []);
        await hardhatPokemon.createPokemon( "ivysaur", 2, []);

        const pokemons = await hardhatPokemon.getAllPokemons();

        expect(pokemons.length).to.equal(2);

    });

    it("Challenge 2 - Exception when creating a pokemon with id equal to 0", async function () {
        
        const PokemonFactory = await ethers.getContractFactory("PokemonFactory");
        const hardhatPokemon = await PokemonFactory.deploy();
        
        await expect( hardhatPokemon.createPokemon( "bulbasaur", 0 , [])).to.be.reverted;
        
    });

    it("Challenge 2 - Exception when creating a pokemon with a name less than 2 characters", async function () {

        const PokemonFactory = await ethers.getContractFactory("PokemonFactory");
        const hardhatPokemon = await PokemonFactory.deploy();
        
        await expect( hardhatPokemon.createPokemon( "", 1 , [])).to.be.reverted;
        await expect( hardhatPokemon.createPokemon( "a", 1,  [])).to.be.reverted;
        // await expect( hardhatPokemon.createPokemon( undefined, 1, [] )).to.be.reverted;
        // await expect( hardhatPokemon.createPokemon( null, 1, [] )).to.be.reverted;

    });

    it("Challenge 3 - Pokemon with Abilities", async function () {

        const PokemonFactory = await ethers.getContractFactory("PokemonFactory");
        const hardhatPokemon = await PokemonFactory.deploy();

        hardhatPokemon.createHability("stench", "This Pokémon's damaging moves have a 10% chance to make the target", 1);
        hardhatPokemon.createHability("drizzle", "ummons rain that lasts indefinitely upon entering battle.", 2);
        hardhatPokemon.createHability("speed-boost", "This Pokémon's Speed rises one stage after each turn.", 3);

        const abilities = await hardhatPokemon.getAllAbilities();

        await hardhatPokemon.createPokemon( "bulbasaur", 1, [1,2]);
        await hardhatPokemon.createPokemon( "ivysaur", 2, [1,2,3]);

        const pokemons = await hardhatPokemon.getAllPokemons();

        // console.log(abilities);
        expect(abilities.length).to.equal(3);

        // console.log(pokemons);
        expect(pokemons.length).to.equal(2);

        const abilitiesByPokemon = await hardhatPokemon.getAbilitiesByPokemonId(1);
        // console.log(abilitiesByPokemon);
        expect(abilitiesByPokemon.length).to.equal(2);

    });




});