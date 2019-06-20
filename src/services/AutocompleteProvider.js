import { REGEXP_ENGLISH, REGEXP_WHITESPACE_AND_PUNCTUATION } from '@/Matchers.js'

export default class AutocompleteProvider {

  /**
   * Instantiates the internal datastore.
   * @param returnLimit the maximum number of words to return for autocompletion. Default of 30.
   */
  constructor(returnLimit) {
    // Map of string, number.
    this.data = new Map();
    this.returnLimit = returnLimit || 30;
  }

  /**
   * Provides a sort for two arbitrary candidate tuples.
   * @param a A tuple with the element at index 1 being a number.
   * @param b A tuple with the element at index 1 being a number.
   * @returns -1, 0, or 1, comparing the confidence of candidate b to candidate a.
   **/
  candidateSortFunction(a, b) {
    if (b[1] === a[1]) return 0;
    if (b[1] > a[1]) return 1;
    if (b[1] < a[1]) return -1;
  }

  /**
   * Retrieves possible word matches from the datastore.
   * @param fragment Word fragment to match against.
   * @returns an array of word - confidence tuples, ordered by confidence.
   */
  getWords(fragment) {
    // Care must be taken to prevent arbitrary regexp from matching,
    //  so we test to see if it's comprised of normal english letter options in order to decide what test to use.
    const isEnglish = REGEXP_ENGLISH.test(fragment);
    return [...this.data]
    .filter((candidate) => isEnglish ? RegExp('^'+fragment, 'i').test(candidate[0]) : candidate[0].startsWith(fragment))
    .sort(this.candidateSortFunction)
    .slice(0, this.returnLimit);
  }

  /**
   * Trains the autocompleteprovider on a given passage.
   * @param passage String of words.
   */
  train(passage) {
    if (passage !== null && typeof passage === 'string')
      passage.toLowerCase().split(REGEXP_WHITESPACE_AND_PUNCTUATION)
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
