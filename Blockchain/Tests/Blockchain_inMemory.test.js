const Blockchain = require('../Blockchain');
const Adapter = require('../../storageAdapters/inMemory/Adapter');
const Block = require('../../Block/Block');

test('adds Genesis Block', () => {
    let storageAdapter = new Adapter()
    let chain = new Blockchain(storageAdapter)
    expect(chain.getBlockHeight()).toBe(0);
});

test('adds Block', () => {
    let storageAdapter = new Adapter()
    let chain = new Blockchain(storageAdapter)
    expect(chain.getBlockHeight()).toBe(0);
    chain.addBlock(new Block())
    expect(chain.getBlockHeight()).toBe(1);
});