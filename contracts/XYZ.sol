// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XYZ is ERC20 {

  address private owner;
  uint256 public creationTime;                       // The date that the contract deployed
  uint256 public deadline;                           // The deadline to deposit
  uint256 private T1;
  uint256 private T2;
  uint256 private T3;
  uint256 private T4;

  uint256 public currentTime;
  uint256 public totalDeposit;                                   // Total amount of deposit in the bank
  uint256 private deposit;
  uint256 public reward;
  uint256 public R;                                        //reward of the bank
  uint256 public T;                                        //time period constant

  modifier depositPeriod(address to) {
    currentTime = block.timestamp;
    deadline = creationTime + T;
    if (to == owner && deadline < currentTime) revert();
    _;
  }

  modifier lockPeriod(address to) {
    currentTime = block.timestamp;
    T1 = creationTime + T;
    T2 = creationTime + 2*T;
    if (to == msg.sender && T1 < currentTime && T2 > currentTime) revert();
    _;
  }


  constructor(string memory _name, string memory _symbol, uint _initialSupply)
  ERC20(_name, _symbol) {
    require(_initialSupply > 0, "INITIAL_SUPPLY has to be greater than 0");
    _mint(msg.sender, _initialSupply);
    owner = payable(msg.sender);
    creationTime = block.timestamp;
    R = 1000;
    T = 60*1; // 1 minutes

  }

/**
  * @notice Transfers tokens held by timelock to beneficiary.
  */
function release() public virtual {
require(block.timestamp >= releaseTime(), "TokenTimelock: current time is before release time");

uint256 amount = R;
require(amount > 0, "TokenTimelock: no tokens to release");

transfer(owner, amount);
}

/**
 * @return the time when the tokens are released.
 */
function releaseTime() public view virtual returns (uint256) {
return creationTime + 4*T;
}

  /**
 * @dev Hook that is called before any transfer of tokens. This includes
 * minting and burning.
 *
 * Calling conditions:
 *
 * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
 * will be transferred to `to`.
 * - when `from` is zero, `amount` tokens will be minted for `to`.
 * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
 * - `from` and `to` are never both zero.
 *
 * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
 */
  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override depositPeriod(to) lockPeriod(to){
 // ) internal virtual override {

    if ( totalDeposit != 0 ){
      reward = 0;
      if (from == owner && to == msg.sender){ // condition satisfies at transferFrom()
        currentTime = block.timestamp;
        T1 = creationTime + T;
        T2 = creationTime + 2*T;
        T3 = creationTime + 3*T;
        T4 = creationTime + 4*T;
        deposit = allowance(owner, msg.sender);

        if (currentTime > T2){
          reward += R*(deposit / totalDeposit)*20/100;
        } else if (currentTime > T3){
          reward += R*(deposit / totalDeposit)*30/100;
        }else if (currentTime > T4){
          reward += R*(deposit / totalDeposit)*50/100;
        }else{
          reward = 0;
        }

        require(R >= reward, "ERC20: transfer amount exceeds balance");
        unchecked {
          R -=  reward;
        }
        _balances[to] += reward;
        totalDeposit -= amount;

      }

    } else {
      // If the total deposit is zero there is no reward.
      reward = 0;
    }
  }

  /**
 * @dev Hook that is called after any transfer of tokens. This includes
 * minting and burning.
 *
 * Calling conditions:
 *
 * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
 * has been transferred to `to`.
 * - when `from` is zero, `amount` tokens have been minted for `to`.
 * - when `to` is zero, `amount` of ``from``'s tokens have been burned.
 * - `from` and `to` are never both zero.
 *
 * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
 */
  function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override {

    if (to == owner) {
      _approve(owner, from, _allowances[owner][from] + amount);
      totalDeposit += amount;
    }
  }


}