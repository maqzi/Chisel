pragma solidity >=0.4.24;

contract Chisel {
    string myMessage;

    function setMessage(string memory x) public {
        myMessage = x;
    }

    function getMessage() public view returns (string memory) {
        return myMessage;
    }
}