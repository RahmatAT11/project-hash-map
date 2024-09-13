const LinkedListsModule = require("@terika/linked-lists");

function createHashMap() {
    const LOAD_FACTOR = 0.8;
    let buckets = Array.from(Array(16));

    const hash = (key) => {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    };

    const set = (key, value) => {
        const hashKey = hash(key);
        const indexKey = hashKey % buckets.length;
        
        if (!buckets[indexKey]) {
            const linkedlist = LinkedListsModule.createLinkedList();

            linkedlist.append(value);
            buckets[indexKey] = linkedlist;
        }

        console.log(buckets[indexKey].toString());
    };

    return {set}
}

module.exports = {createHashMap};