const solanaWeb3 = require('@solana/web3.js');

const csv = require('csv-parser');
const fs = require('fs');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');

const walletAddressList = [];

fs.createReadStream('wallet.csv').pipe(csv()).on('data', (row) => {
    walletAddressList.push(Object.values(row)[0])
});

setTimeout(() => {
    getBalance();
}, 1000);

async function getBalance() {
    for (let i = 0; i < walletAddressList.length; i++) {

        (async () => {     
     
            const publicKey = walletAddressList[i];
    
            if (publicKey !== null) {
                
                const public_key = new solanaWeb3.PublicKey(publicKey);
    
                      const getBalance = await connection.getBalance(public_key);
    
                            const balance = getBalance/1000000000;
            
                            // Sıfırdan büyük olanları almak içindir
                            if (balance > 0) {
                                console.log(publicKey + ' => ' + balance)
                            }   
                      }
          })();

        await sleep(i * 500);
    }
    console.log('Done');
}