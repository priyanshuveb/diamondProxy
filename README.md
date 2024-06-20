## About
- The following is the diamond proxy implementation using diamond-3
- It is using AppStorage model to store the state variables
## Setup
```bash
git clone https://github.com/priyanshuveb/diamondProxy.git
```
```bash
npm install
```

## Deploy
First we will be deploying AFacet.sol
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Upgrade
The next step is, we will upgrade by deploying ABFacet.sol
```bash
npx hardhat run scripts/upgrade.js --network sepolia
```

## Deployed Addresses
The below addresses are deployed on sepolia testnet due to some bsc testnet issue:

DiamondCutFacet deployed: 0x5E39cFF786b6Ef485f0AeFc05068ab648f724449
Diamond deployed: 0x5bb74bA054C30e05c1Eb69a015a8ab3c3b5D7A46
DiamondInit deployed: 0xA216484aAF63CdfB3cdB363fd103E8c304337EB4

Deploying facets
DiamondLoupeFacet deployed: 0x5EB419007292F3C7DA68AA8813fc77b05F7CdDf0
OwnershipFacet deployed: 0x1E53B4f3433096dCDc5A9A8f82143F2E15489658
AFacet deployed: 0xe5e7eB41Da62cB066bAb52D7EfA1BB5b4EDE5002
ABFacet deployed: 0x77AB9D72F19E4845a7729be97Bbf47EF099803EA

## Interactive Link
Link to interact with various functions of the contract: [Louper](https://louper.dev/diamond/0x5bb74bA054C30e05c1Eb69a015a8ab3c3b5D7A46?network=sepolia#facets)


