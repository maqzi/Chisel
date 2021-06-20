import React, { Component } from "react";
import Chisel from "./contracts/Chisel.json";
import SimpleStorage from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { message:"", storageValue: "", web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      document.title = "Chisel"

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = Chisel.networks[networkId];

      const instance = new web3.eth.Contract(
          Chisel.abi,
          deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getStoredValue);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  getStoredValue = async () => {
    const { contract } = this.state;

    // Get the value from the contract.
    const response = await contract.methods.getMessage().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  submit = async () => {
    const {storageValue, message, contract, accounts} = this.state
    await contract.methods.setMessage(storageValue+message).send({ from: accounts[0] });
    await this.getStoredValue()
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
        <div className="App">
          <h1>Chisel away!</h1>
          <p>You can now store data in the block chain forever.</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Enter your message here: <br/>
            </label>
            <input type="text" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} />
            <input type="submit" value="Submit" onClick={this.submit}/>
          </form>
          <br/>
          <div>The stored value is: {this.state.storageValue}</div>
          <p style={{'font-size': 10}}>(There might be a delay in it appearing in the chain above; during which the transaction gets confirmed by the network)</p>
        </div>
    );
  }
}

export default App;
