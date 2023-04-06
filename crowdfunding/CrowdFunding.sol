// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/// @title Contrato de Ejemplo de CrowdFunding
/// @author AngelSanchezT
/// @notice Este contrato permite a los usuarios contribuir a un proyecto de crowdfunding y rastrear los fondos recaudados.
/// @dev Este contrato utiliza el estándar de comentarios de NatSpec para proporcionar documentación del código.

contract CrowdFunding {
    // Variables de estado
    string public id;
    string public name;
    string public description;
    address payable public author;
    string public state = "Opened";
    uint256 public funds;
    uint256 public fundraisingGoal;

    // Constructor
    /// @param _id ID único del proyecto de crowdfunding
    /// @param _name Nombre del proyecto de crowdfunding
    /// @param _description Descripción del proyecto de crowdfunding
    /// @param _fundraisingGoal Cantidad objetivo de fondos que se deben recaudar para financiar el proyecto con éxito
    constructor(
        string memory _id,
        string memory _name,
        string memory _description,
        uint256 _fundraisingGoal
    ) {
        // Inicializa las variables de estado correspondientes
        id = _id;
        name = _name;
        description = _description;
        fundraisingGoal = _fundraisingGoal;
        // Registra la dirección Ethereum del creador del contrato
        author = payable(msg.sender);
    }

    // Función para contribuir al proyecto de crowdfunding
    /// @notice Esta función permite a los usuarios contribuir al proyecto de crowdfunding.
    /// @dev Los fondos enviados se agregan a la cantidad total de fondos recaudados.
    function fundProject() public payable {
        // Transfiere el valor enviado a la dirección Ethereum del autor del contrato
        author.transfer(msg.value);
        // Incrementa la cantidad de fondos recaudados por la cantidad enviada por el usuario
        funds += msg.value;
    }

    // Función para cambiar el estado del proyecto
    /// @notice Esta función permite al creador del contrato cambiar el estado del proyecto.
    /// @param newState El nuevo estado del proyecto.
    function changeProjectState(string calldata newState) public {
        // Actualiza el estado actual del proyecto a la cadena proporcionada como entrada
        state = newState;
    }
}
