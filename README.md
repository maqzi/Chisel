# Chisel

Chisel is an ethereum smart contract based Dapp to store information into the blockchain permanently. The project has been bootstrapped with Truffle.

## Steps
- Download truffle to your local dev env: `npm install -g truffle`.
- Update the smart contract in `contracts/` if needed.
- Compile the contract using `truffle compile`.
- Migrate the compilation to the Chisel-Web app `truffle migrate`.
- Load the Web app. Read more [here]('chisel-web/README.md').

## Troubleshooting
- Make sure you set the correct network details in truffle-config.js.
- If `truffle migrate` fails stating 'Could not connect to Ethereum client' with different parameters than the one in `truffle-config.js`, use `truffle migrate --network <network-name-in-truffle-config.js>` instead.