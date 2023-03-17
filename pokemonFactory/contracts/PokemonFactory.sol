// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract PokemonFactory {

    struct Ability {
        string name;
        string description;
    }

    struct Pokemon {
        uint id;
        string name;
    }

    Pokemon[] private pokemons;
    Ability[] private abilitiesList;
    
    mapping(uint => Ability) public abilities;
    mapping(uint => uint[]) pokemonAbilities;

    mapping(uint => address) public pokemonToOwner;
    mapping(address => uint) ownerPokemonCount;

    event eventNewPokemon(address sender, string message);

    function createPokemon(string memory _name, uint _id, uint[] memory _abilities ) public {
        require(_id > 0, "Pokemon id must be greater than zero");
        
        bytes memory tempNamePokemon = bytes(_name);
        require(tempNamePokemon.length >= 2,"pokemon name must be greater than 2 characters");

        pokemons.push(Pokemon(_id, _name));
        pokemonToOwner[_id] = msg.sender;
        ownerPokemonCount[msg.sender]++;

        pokemonAbilities[_id] = _abilities;

        emit eventNewPokemon(msg.sender, "new pokemon its create");
    }

    function getAllPokemons() public view returns (Pokemon[] memory) {
        return pokemons;
    }

    function createHability(string memory _name, string memory _description, uint _id) public {
        require(_id > 0, "Ability id must be greater than zero");
        Ability memory ability = Ability(_name, _description);
        abilities[_id] = ability;
        abilitiesList.push(ability);
    }

    function getAllAbilities() public view returns (Ability[] memory) {
        return abilitiesList;
    }

    function getAbilitiesByPokemonId(uint _id) public view returns (Ability[] memory) {
        
        uint[] memory _abilities = pokemonAbilities[_id];
        Ability[] memory _abilitiesByPokemon = new Ability[](_abilities.length);

        for(uint i = 0; i < _abilities.length; i++) {
            uint _abilityId = _abilities[i];
            _abilitiesByPokemon[i] = abilities[_abilityId];
        }

        return _abilitiesByPokemon;
    }
}