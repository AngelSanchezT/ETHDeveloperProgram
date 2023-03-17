// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract PokemonFactory {

    struct Ability {
        string name;
        string description;
    }

    struct PokemonType {
        string name;
        string description;
    }

    struct PokemonWeakness {
        string name;
        string description;
    }

    struct Pokemon {
        uint id;
        string name;
    }

    Pokemon[] private pokemons;
    Ability[] private abilitiesList;
    PokemonType[] private pokemonTypeList;
    PokemonWeakness[] private pokemonWeaknessList;
    
    mapping(uint => Ability) public abilities;
    mapping(uint => uint[]) pokemonAbilities;

    mapping(uint => PokemonType) public types;
    mapping(uint => uint[]) pokemonTypes;

    mapping(uint => PokemonWeakness) public weaknesses;
    mapping(uint => uint[]) pokemonWeaknesses;

    mapping(uint => address) public pokemonToOwner;
    mapping(address => uint) ownerPokemonCount;

    event eventNewPokemon(address sender, string message);

    function createPokemon(string memory _name, uint _id, uint[] memory _abilities, uint[] memory _types, uint[] memory _weaknesses ) public {
        require(_id > 0, "Pokemon id must be greater than zero");
        
        bytes memory tempNamePokemon = bytes(_name);
        require(tempNamePokemon.length >= 2,"pokemon name must be greater than 2 characters");

        pokemons.push(Pokemon(_id, _name));
        pokemonToOwner[_id] = msg.sender;
        ownerPokemonCount[msg.sender]++;

        pokemonAbilities[_id] = _abilities;
        pokemonTypes[_id] = _types;
        pokemonWeaknesses[_id] = _weaknesses;

        emit eventNewPokemon(msg.sender, "new pokemon its create");
    }

    function getAllPokemons() public view returns (Pokemon[] memory) {
        return pokemons;
    }

    function createAbility(string memory _name, string memory _description, uint _id) public {
        require(_id > 0, "Ability id must be greater than zero");
        Ability memory ability = Ability(_name, _description);
        abilities[_id] = ability;
        abilitiesList.push(ability);
    }

    function createType(string memory _name, string memory _description, uint _id) public {
        require(_id > 0, "Type id must be greater than zero");

        PokemonType memory _type = PokemonType(_name, _description);
        types[_id] = _type;
        pokemonTypeList.push(_type);
    }

    function createWeakness(string memory _name, string memory _description, uint _id) public {
        require(_id > 0, "Weakness id must be greater than zero");

        PokemonWeakness memory _weakness = PokemonWeakness(_name, _description);
        weaknesses[_id] = _weakness;
        pokemonWeaknessList.push(_weakness);
    }

    function getAllAbilities() public view returns (Ability[] memory) {
        return abilitiesList;
    }

    function getAllPokemonTypes() public view returns (PokemonType[] memory) {
        return pokemonTypeList;
    }

    function getAllPokemonWeaknesses() public view returns (PokemonWeakness[] memory) {
        return pokemonWeaknessList;
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

    function getTypesByPokemonId(uint _id) public view returns (PokemonType[] memory) {
        
        uint[] memory _types = pokemonTypes[_id];
        PokemonType[] memory _typesByPokemon = new PokemonType[](_types.length);

        for(uint i = 0; i < _types.length; i++) {
            uint _typeId = _types[i];
            _typesByPokemon[i] = types[_typeId];
        }

        return _typesByPokemon;
    }

    function getWeaknessesByPokemonId(uint _id) public view returns (PokemonWeakness[] memory) {
        
        uint[] memory _weakness = pokemonWeaknesses[_id];
        PokemonWeakness[] memory _weaknessByPokemon = new PokemonWeakness[](_weakness.length);

        for(uint i = 0; i < _weakness.length; i++) {
            uint _weaknessId = _weakness[i];
            _weaknessByPokemon[i] = weaknesses[_weaknessId];
        }

        return _weaknessByPokemon;
    }
}