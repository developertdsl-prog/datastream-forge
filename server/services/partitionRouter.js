const crypto = require('crypto');

const computePartition = (key, partitionCount = 4) => {
  if (partitionCount <= 1) return 0;
  if (!key || key === '') {
    return Math.floor(Math.random() * partitionCount);
  }

  // Consistent 32-bit hash simulation
  const hash = crypto.createHash('md5').update(String(key)).digest();
  const intVal = hash.readUInt32BE(0);
  return intVal % partitionCount;
};

module.exports = { computePartition };
