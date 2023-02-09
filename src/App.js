import './App.css';
import { useState } from 'react';
import { ethers } from "ethers";
import {ToastContainer, toast} from "react-toastify";
import WRHeader from 'wrcomponents/dist/WRHeader';
import WRFooter from 'wrcomponents/dist/WRFooter';
import WRContent from 'wrcomponents/dist/WRContent';
import WRTools from 'wrcomponents/dist/WRTools';


function App() {

  const REACT_APP_ALCHEMY_WWS_URL = "wss://eth-goerli.g.alchemy.com/v2/nWBr-TblWJsjiT3l6_4LX9nH1-IORPya"
  const [transactions, setTransactions] = useState({
    hash: '',
    to: '',
    from: '',
    data: ''
  })

  const getDataMempool = () => {
    const provider = new ethers.WebSocketProvider(REACT_APP_ALCHEMY_WWS_URL);

    provider.on("pending", (tx) => {
      provider.getTransaction(tx)
        .then((data) => {
          
          const newTx = {
            hash: compactAddress(data.hash),
            from: compactAddress(data.from),
            to: compactAddress(data.to),
            data: data.data.substring(2,10),
          }

          setTransactions(newTx)
        })
        
    })

  }

  function compactAddress(text){
    if( text =='' || text == undefined || text == null){
        return ''
    }
    let newText = text.substring(0,6)
    newText = newText + '....' + text.substring(text.length - 6);
    return newText;
  }


//   ccessList: null
// ​
// blockHash: null
// ​
// blockNumber: null
// ​
// chainId: 5n
// ​
// data: "0x803a0ff3000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000018f436d40381ff209be92e262672a5e32c53e934e50c95b9b3bddeda87a603d50f5f03f"
// ​
// from: "0x2DE89b39CFDffd7DfC738939798db6022a3F6C3b"
// ​
// gasLimit: 52810n
// ​
// gasPrice: 2785651n
// ​
// hash: "0x69e75690a1bcd5f3ce8b3c0462a62f8aea62de8a7b3f8e3fdc99ed6c4a1dfcff"
// ​
// index: undefined
// ​
// maxFeePerGas: null
// ​
// maxPriorityFeePerGas: null
// ​
// nonce: 559
// ​
// provider: Object { #subs: Map(1), #plugins: Map(0), #pausedState: null, … }
// ​
// signature: Object { #r: "0xc638a794e2735dd68da3e5286c22327abf7eeaf1633c2b042017446ac63cfeed", #s: "0x6ab7ab8f89ae6dd46ea1743684333a8ba35700e6c4679bf69618fc2586d6cc88", #v: 28, … }
// ​
// to: "0x5C0aca908b1747e095Fff27B2735f543dae8a14F"
// ​
// type: 0
// ​
// value: 0n


  getDataMempool()

  return (
    
    <div className="App">
      <ToastContainer position="top-center" autoClose={5000}/>
      <WRHeader title="MEMPOOL PENDING (GOERLI)" image={true} />
      <WRContent>
        <p>{`${transactions.hash} - ${transactions.to} - ${transactions.from} - ${transactions.data}`}</p>
      </WRContent>
      <WRTools react={true} hardhat={true} bootstrap={true} solidity={true} css={true} javascript={true} ethersjs={true} />
      <WRFooter /> 
    </div>
  );
}

export default App;
