// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract PokemonFactory {
    struct Pokemon {
        uint id;
        string name;
    }

    Pokemon[] private pokemons;

    mapping(uint => address) public pokemonToOwner;
    mapping(address => uint) ownerPokemonCount;

    event eventNewPokemon(address sender, string message);

    function createPokemon(string memory _name, uint _id) public {
        require(_id > 0, "Pokemon id must be greater than zero");
        
        bytes memory tempNamePokemon = bytes(_name);
        require(tempNamePokemon.length >= 2,"pokemon name must be greater than 2 characters");

        pokemons.push(Pokemon(_id, _name));
        pokemonToOwner[_id] = msg.sender;
        ownerPokemonCount[msg.sender]++;
        emit eventNewPokemon(msg.sender, "new pokemon its create");
    }

    function getAllPokemons() public view returns (Pokemon[] memory) {
        return pokemons;
    }
}