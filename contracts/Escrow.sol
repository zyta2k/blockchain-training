contract Escrow {
    address public owner;
    address public claimer;
    uint public amount;

    error OnlyClaimerCanWithdraw(address _operator);
    error FailedToSendEther(address _operator);

    constructor(address _claimer) {
        owner = msg.sender;
        claimer = _claimer;
    }

    function deposit() public payable {
        require(msg.sender == owner, "Only owner can deposit");
        amount = msg.value;
    }

    function withdraw() public {
        if (msg.sender != claimer) revert OnlyClaimerCanWithdraw(msg.sender);
        (bool sent, ) = claimer.call{value: amount}("");
        if (!sent) revert FailedToSendEther(msg.sender);
    }
}
