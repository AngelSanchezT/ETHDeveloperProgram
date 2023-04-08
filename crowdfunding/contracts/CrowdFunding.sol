// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/// @title Contrato de Ejemplo de CrowdFunding
/// @author AngelSanchezT
/// @notice Este contrato permite a los usuarios contribuir a un proyecto de crowdfunding y rastrear los fondos recaudados.
/// @dev Este contrato utiliza el estándar de comentarios de NatSpec para proporcionar documentación del código.

contract CrowdFunding {

    enum State { Opened, Closed }


    // Variables de estado
    struct Project {
        // id: representa el ID único del proyecto de crowdfunding.
        string id;
        // name: representa el nombre del proyecto de crowdfunding.
        string name;
        // description: representa la descripción del proyecto de crowdfunding.
        string description;
        // author: representa la dirección Ethereum del autor o creador del contrato de crowdfunding.
        address payable author;
        // state: representa el estado actual del proyecto, que se inicializa como "Opened" = 0.
        State state;
        // funds: representa la cantidad total de fondos que se han recaudado hasta el momento.
        uint funds;
        // fundraisingGoal: representa la cantidad objetivo de fondos que se deben recaudar para que el proyecto sea financiado con éxito.
        uint fundraisingGoal;
    }

    Project public project;

    // Constructor
    /// @param _id ID único del proyecto de crowdfunding
    /// @param _name Nombre del proyecto de crowdfunding
    /// @param _description Descripción del proyecto de crowdfunding
    /// @param _fundraisingGoal Cantidad objetivo de fondos que se deben recaudar para financiar el proyecto con éxito
    constructor(
        string memory _id,
        string memory _name,
        string memory _description,
        uint _fundraisingGoal
    ) {
        // Inicializa las variables de estado correspondientes
        project = Project(
            _id,
            _name,
            _description,
            // Registra la dirección Ethereum del creador del contrato
            payable(msg.sender),
            State.Opened,
            0,
            _fundraisingGoal
        );
    }

    event ProjectFunded(string projectId, uint value);

    event ProjectStateChanged(string projectId, State state);

    modifier isAuthor() {
        require(
            project.author == msg.sender,
            "You need to be the project author"
        );
        _;
    }

    modifier isNotAuthor() {
        require(
            project.author != msg.sender,
            "As author you can not fund your own project"
        );
        _;
    }

    // Función para contribuir al proyecto de crowdfunding
    /// @notice Esta función permite a los usuarios contribuir al proyecto de crowdfunding.
    /// @dev Los fondos enviados se agregan a la cantidad total de fondos recaudados.
    function fundProject() public payable isNotAuthor {
        require(project.state != State.Closed, "The project can not receive funds");
        require(msg.value > 0, "Fund value must be greater than 0");

        // Transfiere el valor enviado a la dirección Ethereum del autor del contrato
        project.author.transfer(msg.value);
        // Incrementa la cantidad de fondos recaudados por la cantidad enviada por el usuario
        project.funds += msg.value;
        emit ProjectFunded(project.id, msg.value);
    }

    // Función para cambiar el estado del proyecto
    /// @notice Esta función permite al creador del contrato cambiar el estado del proyecto.
    /// @param newState El nuevo estado del proyecto.
    function changeProjectState(State newState) public isAuthor {
        require(project.state != newState, "New state must be different");
        // Actualiza el estado actual del proyecto a la cadena proporcionada como entrada
        project.state = newState;
        emit ProjectStateChanged(project.id, newState);
    }
}
