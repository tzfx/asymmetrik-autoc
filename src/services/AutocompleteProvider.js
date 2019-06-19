export default class AutocompleteProvider {

  /**
   * Instantiates the internal datastore.
   */
  constructor() {
    // Map of string, number.
    this.data = new Map();
  }

  /**
   * Retrieves possible word matches from the datastore.
   * @param fragment Word fragment to match against.
   * @returns an array of word - confidence tuples, ordered by confidence.
   */
  getWords(fragment) {
    const startsWith = RegExp('^'+fragment, 'i');
    return [...this.data]
    .filter((candidate) => startsWith.test(candidate[0]))
    .sort((a, b) => {
      if (b[1] === a[1]) return 0;
      if (b[1] > a[1]) return 1;
      if (b[1] < a[1]) return -1;
    });
  }

  /**
   * Trains the autocompleteprovider on a given passage.
   * @param passage String of words.
   */
  train(passage) {
    if (passage !== null && typeof passage === 'string')
      passage.toLowerCase().match(/[a-zA-Z']+/g)
      .forEach(
        (word) => {
          if (this.data.has(word))
            this.data.set(word, this.data.get(word) + 1);
          else
            this.data.set(word, 1);
        }
      );
  }
}
