//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./BFacet.sol";
contract ABFacet is BFacet {
    // AppStorage internal s;
    event theValue(uint256 value);

    modifier onlyAdminA {
        require(s.adminAList[msg.sender], "Unauthorised access!");
        _;
    }

    modifier nonReentract {
        require(!s.isInside, "Reentracy attempt!");
        s.isInside = true;
        _;
        s.isInside = false;
    }


    function initializeA(address account) public {
        require(!s.initializedA, 'Already initialized');
        s.adminAList[account] = true;
        s.initializedA = true;
    }

    function getValue() public onlyAdminA nonReentract {
        emit theValue(s.value);
    }

    function setValue(uint256 _value) public onlyAdminA nonReentract {
        s.value += _value;
    }

    // for personal reference, remove it afterwards
    function getValueView() public view returns(uint256) {
        return s.value;
    }

}