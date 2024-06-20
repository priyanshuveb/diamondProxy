
/* global ethers */
const { /*getSelectors,*/ } = require('./libraries/diamond.js')
const { ethers } = require('hardhat')
function getSelectors (contract) {
    const signatures = Object.keys(contract.interface.functions)
    const selectors = signatures.reduce((acc, val) => {
      if (val !== 'init(bytes)') {
        acc.push(contract.interface.getSighash(val))
      }
      return acc
    }, [])
    return selectors
  }
  
  function getSelector (func) {
    const abiInterface = new ethers.utils.Interface([func])
    return abiInterface.getSighash(ethers.utils.Fragment.from(func))
  }
  
  async function main () {
    const diamondAddress = '0x5bb74bA054C30e05c1Eb69a015a8ab3c3b5D7A46'
    const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 }


    async function remove() {

        const oldA = await ethers.getContractAt('AFacet',"0xe5e7eB41Da62cB066bAb52D7EfA1BB5b4EDE5002")
      
        const cut = [
          {
            facetAddress: ethers.constants.AddressZero,
            action: FacetCutAction.Remove,
            functionSelectors: getSelectors(oldA)
          }
        ]
      
        const diamondCut = await ethers.getContractAt('IDiamondCut', diamondAddress)
        const tx = await diamondCut.diamondCut(cut, ethers.constants.AddressZero, '0x', { gasLimit: 5000000 })
        console.log('Diamond cut tx:', tx.hash)
        const receipt = await tx.wait()
        if (!receipt.status) {
          throw Error(`Diamond upgrade failed: ${tx.hash}`)
        }
        console.log('Completed diamond cut: ', tx.hash)
    }

    async function add() {
        const AB = await ethers.getContractFactory('ABFacet')
        const ab = await AB.deploy()
        await ab.deployed()
        console.log(`ABFacet deployed:`,ab.address);
        console.log(`What is happening`);

        const cut = [
            {
              facetAddress: ab.address,
              action: FacetCutAction.Add,
              functionSelectors: getSelectors(ab)
            }
          ]
        
          const diamondCut = await ethers.getContractAt('IDiamondCut', diamondAddress)
          const tx = await diamondCut.diamondCut(cut, ethers.constants.AddressZero, '0x', { gasLimit: 5000000 })
          console.log('Diamond cut tx:', tx.hash)
          const receipt = await tx.wait()
          if (!receipt.status) {
            throw Error(`Diamond upgrade failed: ${tx.hash}`)
          }
          console.log('Completed diamond cut: ', tx.hash)
    }

    await remove()
    await add()
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })