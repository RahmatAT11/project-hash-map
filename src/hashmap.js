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
  };

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

      console.log("New bucket length is: ", newLength);
    }

    if (!buckets[indexKey]) {
      const linkedlist = LinkedListsModule.createLinkedList();
      const newArr = [];
      newArr.push(key);
      newArr.push(value);

      linkedlist.append(newArr);
      buckets[indexKey] = linkedlist;
    } else {
      const newArr = [];
      newArr.push(key);
      newArr.push(value);
      console.log(newArr.toString());
      console.log(buckets[indexKey].toString());

      for (let i = 0; i < buckets[indexKey].getSize(); i++) {
        console.log(i)
        if (buckets[indexKey].at(i).value[0] === key) {
          buckets[indexKey].at(i).value[1] = value;
          return;
        }
      }

      buckets[indexKey].append(newArr);
    }
  };

  const get = (key) => {
    const hashKey = hash(key);
    const indexKey = hashKey % buckets.length;

    if (!buckets[indexKey]) {
      return null;
    }

    let returnValue = null;

    for (let i = 0; i < buckets[indexKey].getSize(); i++) {
      if (buckets[indexKey].at(i).value[0] === key) {
        returnValue = buckets[indexKey].at(i).value[1];
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
      if (buckets[indexKey].at(i).value[0] === key) {
        return true;
      }
    }

    return false;
  };

  const remove = (key) => {
    const hashKey = hash(key);
    const indexKey = hashKey % buckets.length;

    if (!buckets[indexKey]) {
      return false;
    }

    for (let i = 0; i < buckets[indexKey].getSize(); i++) {
      if (buckets[indexKey].at(i).value[0] === key) {
        buckets[indexKey].removeAt(i);
        return true;
      }
    }

    return false;
  };

  const length = () => {
    let count = 0;

    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) {
        count++;
      }
    }

    return count;
  };

  const clear = () => {
    buckets = Array.from(Array(buckets.length));
  };

  const keys = () => {
    const arrayOfKeys = [];
    for (let i = 0; i < buckets.length; i++) {
      const linkedList = buckets[i];

      if (linkedList) {
        for (let j = 0; j < linkedList.getSize(); j++) {
          arrayOfKeys.push(linkedList.at(j).value[0])
        }
      }
    }

    return arrayOfKeys;
  };

  return { set, get, has, remove, length, clear, keys };
}

module.exports = { createHashMap };
