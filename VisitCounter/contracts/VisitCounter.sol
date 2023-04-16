// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract VisitCounter {
    struct Person {
        uint256 counter;
        string[] messages;
    }

    mapping(address => Person) private people;
    uint256 totalVisits;

    function visit(string calldata _message) external returns (uint256) {
        people[msg.sender].counter++;
        people[msg.sender].messages.push(_message);
        totalVisits++;
        return (totalVisits);
    }

    function getPeople(address _addr) external view returns(Person memory) {
        return(people[_addr]);
    }
}
