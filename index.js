const HashMapModule = require('./src/hashmap');

const hashmap = HashMapModule.createHashMap();
hashmap.set("awjdawj", 10);
hashmap.set("awoojrf", 100);

module.exports = HashMapModule;