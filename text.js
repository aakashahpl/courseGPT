function arrayToParagraph(array) {
  let paragraph = '';
  for (let i = 0; i < array.length; i++) {
    paragraph += array[i];
    if (i !== array.length - 1) {
      paragraph += '\n'; // Add space between words
    }
  }
  return paragraph;
}

// Example usage
const stringsArray = ["This", "is", "an", "example", "array", "of", "strings."];
const paragraph = arrayToParagraph(stringsArray);
console.log(paragraph);