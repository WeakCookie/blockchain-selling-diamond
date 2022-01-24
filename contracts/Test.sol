// SPDX-License-Identifier: MIT

pragma solidity >=0.7.3;

contract Test {
    event UpdatedMessage(string oldString, string newString);

    string public message; // store permanently on blockchain so anybody can access

    constructor (string memory iniMessage) {
        message = iniMessage;
    } // Test

    function update(string memory newMessage) public {
        string memory oldMessage = message;
        message = newMessage;
        emit UpdatedMessage(oldMessage, newMessage);
    }
}