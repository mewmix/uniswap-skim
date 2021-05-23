const Web3 = require('web3');
const fs = require('fs');
const events = require('../logs/events.js');

const web3 = new Web3('ws://wsapi.fantom.network');

const factoryAddress = '0xef45d134b73241eda7703fa787148d9c9f4950b0'; // spiritswap
//const factoryAddress = '0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3'; //spooky
//const factoryAddress = '0x991152411A7B5A14A8CF0cDDE8439435328070dF'; // hyperjump
// spooky: '0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3',
// spirit: '0xef45d134b73241eda7703fa787148d9c9f4950b0',
// hyperjump: '0x991152411A7B5A14A8CF0cDDE8439435328070dF', 

const getPastLogs = async (address, fromBlock, toBlock) => {
	try {
		const response = await web3.eth.getPastLogs({
			fromBlock,
			toBlock,
			address
		});

		const updatedEvents = [...events];

		response.forEach(item => {
			updatedEvents.push(item);
			console.log(`🦄 pair #${updatedEvents.length} deployed in block #${item.blockNumber}`);
		});

		fs.writeFile('./logs/events.js', await `module.exports = ${JSON.stringify(updatedEvents)}`, error => {
			if (error) {
				console.log(error);
			}
		});
	} catch (error) {
		console.log(error);
	}

	setTimeout(() => {
		console.log('updated');
		process.exit();
	}, 2000);
};

getPastLogs(factoryAddress, events[events.length - 1].blockNumber + 1, 'latest');
