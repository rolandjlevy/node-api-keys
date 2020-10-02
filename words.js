const words = [
  'fruit', 'vegetables', 'book', 'pencil', 'paper', 'pen', 'laptop', 'website', 'phone', 'house', 'flat', 'garden', 'tree', 'flower', 'plant', 'shop', 'food', 'friend', 'person', 'dog', 'cat', 'cafe', 'restaurant', 'car', 'road', 'art', 'music', 'happy', 'beach', 'holiday', 'tree', 'river', 'mountain', 'bike', 'fitness', 'freedom', 'peace', 'meditation'
];

const options = words.map(word => `<option value="${word}">${word}</option>`).join('\n');

module.exports = {
  options
}