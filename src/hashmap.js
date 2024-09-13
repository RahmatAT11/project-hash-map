function createHashMap() {
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
        buckets[indexKey] = value;
        console.log("Saved!")
    };

    return {set}
}

module.exports = {createHashMap};