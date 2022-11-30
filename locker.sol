interface IERC20 {
  /**
   * @dev Returns the amount of tokens owned by `account`.
   */
  function balanceOf(address account) external view returns (uint256);

  /**
   * @dev Moves `amount` tokens from the caller's account to `recipient`.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
  function transfer(address recipient, uint256 amount) external returns (bool);

  /**
   * @dev Moves `amount` tokens from `sender` to `recipient` using the
   * allowance mechanism. `amount` is then deducted from the caller's
   * allowance.
   *
   * Returns a boolean value indicating whether the operation succeeded.
   *
   * Emits a {Transfer} event.
   */
  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) external returns (bool);
}

contract liquidityLocker {
  uint256 _start;
  address public myLPToken;
  address public owner = 0xf9013432B10E1F446bb19D5b7C15baB43E9C3867;

  constructor() {
    _start = block.timestamp;
  }

  function lock(uint256 _amount) public {
    IERC20(myLPToken).transferFrom(msg.sender, address(this), _amount);
  }

  function unLock() public {
    require(owner == msg.sender, "caller is not the owner");
    require(block.timestamp - _start >= 15780000);
    IERC20(myLPToken).transfer(
      msg.sender,
      IERC20(myLPToken).balanceOf(address(this))
    );
  }
}
