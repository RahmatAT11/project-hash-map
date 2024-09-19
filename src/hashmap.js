const LinkedListsModule = require("@terika/linked-lists");

function createHashMap() {
    const LOAD_FACTOR = 0.75;
    let buckets = Array.from(Array(16));

    const hash = (key) => {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    };

    const isFilled = () => {
        let count = 0;
        
        for (let i = 0; i < buckets.length; i++) {
            if (buckets[i]) {
                count++;
            }
        }

        if (count >= buckets.length * LOAD_FACTOR) {
            return true;
        }

        return false;
    }

    const set = (key, value) => {
        const hashKey = hash(key);
        const indexKey = hashKey % buckets.length;

        if (isFilled()) {
            const newLength = Math.floor(buckets.length * 1.5);
            const newBucket = Array.from(Array(newLength));
            for (let i = 0; i < buckets.length; i++) {
                newBucket[i] = buckets[i];
            }

            buckets = newBucket;

            console.log("New bucket length is: ", newLength)
        }
        
        if (!buckets[indexKey]) {
            const linkedlist = LinkedListsModule.createLinkedList();
            const newObj = {};
            newObj[key] = value

            linkedlist.append(newObj);
            buckets[indexKey] = linkedlist;
        } else {
            const newObj = {};
            newObj[key] = value

            for (let i = 0; i < buckets[indexKey].getSize(); i++) {
                if (buckets[indexKey].at(i).value[key]) {
                    buckets[indexKey].at(i).value[key] = value;
                    return;
                }
            }
            
            buckets[indexKey].append(newObj);
        }
    };

    const get = (key) => {
        const hashKey = hash(key);
        const indexKey = hashKey % buckets.length;

        if (!buckets[indexKey]) {
            return null;
        }

        let returnValue = 0;

        for (let i = 0; i < buckets[indexKey].getSize(); i++) {
            if (buckets[indexKey].at(i).value.hasOwnProperty(key)) {
                returnValue = buckets[indexKey].at(i).value[key];
                break;
            }
        }

        return returnValue;
    };

    const has = (key) => {
        const hashKey = hash(key);
        const indexKey = hashKey % buckets.length;

        if (!buckets[indexKey]) {
            return false;
        }

        for (let i = 0; i < buckets[indexKey].getSize(); i++) {
            if (buckets[indexKey].at(i).value.hasOwnProperty(key)) {
                return true
            }
        }

        return false;
    }

    return {set, get, has}
}

module.exports = {createHashMap};