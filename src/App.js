import logo from "./logo.svg";
import "./App.css";
const Web3 = require("web3");
// var Contract = require("web3-eth-contract");
const jsonInterface = require("./abi.json");
const address = "0xAfafFA12a6aF4f46eac9E51A9c035a55b7c838b3";
let a = 0;
let b = 0;
let c = 0;
async function connect() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
}

async function mint() {
  console.log(a, b, c);
  const groups = [];
  if (a > 0 && a < 4) {
    groups.push(a);
  }
  if (b > 0 && b < 4) {
    groups.push(b);
  }
  if (c > 0 && c < 4) {
    groups.push(c);
  }
  await connect();
  const userAdd = await window.web3.eth.requestAccounts();
  console.log(userAdd);
  const web3 = new Web3(window.ethereum);
  const nftContract = new web3.eth.Contract(jsonInterface, address);
  await nftContract.methods.publicMint(groups).send({
    from: userAdd[0],
    value: groups.length * 1000000000000,
    gasLimit: 500000,
  });

  // var contract = new Contract(jsonInterface, address);
  // let provider = window.ethereum;
  // console.log(provider);

  // Contract.setProvider(provider);
  // var contract = new Contract(jsonInterface, address);

  // contract.methods.publicMint().send({from: ....})
  // .on('receipt', function(){
  //     ...
  // });
}
function App() {
  return (
    <div className="App">
      <button className="submitButton" onClick={connect}>
        Connect
      </button>
      <input
        type="number"
        id="IDS"
        name="ids"
        onChange={(e) => (a = e.target.value)}
      ></input>
      <input
        type="number"
        id="IDS"
        name="ids"
        onChange={(e) => (b = e.target.value)}
      ></input>
      <input
        type="number"
        id="IDS"
        name="ids"
        onChange={(e) => (c = e.target.value)}
      ></input>
      <button className="submitButton" onClick={mint}>
        Submit
      </button>
    </div>
  );
}

export default App;
