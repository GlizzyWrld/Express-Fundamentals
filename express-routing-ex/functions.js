// Calculate the mean (average) of an array of numbers
function calculateMean(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// Calculate the median of an array of numbers
function calculateMedian(numbers) {
  const sortedNumbers = numbers.slice().sort((a, b) => a - b);
  const length = sortedNumbers.length;
  const middleIndex = Math.floor(length / 2);

  if (length % 2 === 1) {
    return sortedNumbers[middleIndex];
  } else {
    return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
  }
}

// Calculate the mode of an array of numbers
function calculateMode(numbers) {
  const counts = {};
  let maxCount = 0;
  let mode = [];

  for (let number of numbers) {
    counts[number] = (counts[number] || 0) + 1;
    if (counts[number] > maxCount) {
      maxCount = counts[number];
      mode = [number];
    } else if (counts[number] === maxCount) {
      mode.push(number);
    }
  }

  return mode;
}

// Check if each query string is a number
function areQueryParamsNumbers(query) {
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const value = query[key];
        if (isNaN(value)) {
          return false;
        }
      }
    }
    return true;
}

module.exports = {
  calculateMean,
  calculateMedian,
  calculateMode,
  areQueryParamsNumbers,
};
