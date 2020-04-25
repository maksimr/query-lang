/**
 * @template T
 */
export class Cursor {
  /**
   * @template T
   * @param {(Array<T>)} seq
   * @return {Cursor<T>}
   */
  static from(seq) {
    return new Cursor(seq);
  }

  /**
   * @param {Array<T>} seq
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
     * @type {Array<T>}
     */
    this.seq = seq;
  }

  /**
   * @return {T}
   */
  next() {
    return this.seq[this.index++];
  }

  /**
   * @return {T}
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
   * @return {T}
   */
  peek() {
    return this.seq[this.index];
  }

  /**
   * @return {number}
   */
  currentPosition() {
    return this.index;
  }
}