//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {AppStorage} from "../libraries/AppStorage.sol";

contract BFacet {
    AppStorage internal s;

    modifier onlySuperAdmin() {
        require(msg.sender == s.superAdmin, "Unauthorised access");
        _;
    }


    function initializeB(address account) public {
        require(!s.initializedB, "Already initialized");
        s.superAdmin = account;
        s.initializedB = true;
    }

    function addAdminRole(address account) public onlySuperAdmin returns (bool) {
        if (!s.adminAList[account]) {
            s.adminAList[account] = true;
            return true;
        } else {
            return false;
        }
    }

    function removeAdminRole(address account) public onlySuperAdmin returns (bool) {
        if (s.adminAList[account]) {
            s.adminAList[account] = false;
            return true;
        } else {
            return false;
        }
    }

    function transferAdminRole(address from, address to) public onlySuperAdmin returns (bool) {
        if (s.adminAList[from]) {
            s.adminAList[from] = false;
            s.adminAList[to] = true;
            return true;
        } else {
            return false;
        }
    }

    function renounceAdminRole() public returns(bool) {
        if(s.adminAList[msg.sender]) {
            s.adminAList[msg.sender] = false;
            return true;
        } else {
            return false;
        }
    }

    function checkAdmin(address account) public view returns(bool) {
        return s.adminAList[account] ? true : false;
    }
}
