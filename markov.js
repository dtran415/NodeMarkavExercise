/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      const word = this.words[i];
      const nextWord = this.words[i+1] || null;

      if (chains.has(word))
        chains.get(word).push(nextWord);
      else
        chains.set(word, [nextWord]);

      this.chains = chains;
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    const keys = Array.from(this.chains.keys());
    let key = MarkovMachine.randomWordFromArray(keys);
    const result = [];

    while (result.length < numWords && key !== null) {
      result.push(key);
      key = MarkovMachine.randomWordFromArray(this.chains.get(key));
    }

    return result.join(" ");
  }

  static randomWordFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

module.exports = MarkovMachine;