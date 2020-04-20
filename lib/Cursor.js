/**
 * @template T
 */
export class Cursor {
  /**
   * @template T
   * @param {(Array<T>|string)} seq
   * @return {Cursor<T>}
   */
  static from(seq) {
    return new Cursor(seq);
  }

  /**
   * @param {Array<T>|string} seq
   * @param {number} startIndex
   */
  constructor(seq, startIndex = 0) {
    /**
     * @type {number}
     */
    this.index = startIndex;
    /**
     * @type {number}
     */
    this.size = seq.length;
    /**
     * @type {Array<T>|string}
     */
    this.seq = seq;
  }

  /**
   * @return {T|string}
   */
  next() {
    return this.seq[this.index++];
  }

  /**
   * @return {T|string}
   */
  previous() {
    return this.seq[this.index - 1];
  }

  /**
   * @return {boolean}
   */
  hasNext() {
    return this.index < this.size;
  }

  /**
   * @return {T|string}
   */
  peek() {
    return this.seq[this.index];
  }
}