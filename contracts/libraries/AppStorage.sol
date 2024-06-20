//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

struct AppStorage {
    address superAdmin;
    mapping(address => bool) adminAList;
    uint256 value;
    bool initializedA;
    bool initializedB;
    bool isInside;
} 