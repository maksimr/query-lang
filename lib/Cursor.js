export class Cursor {
  /**
   * @param {(Array|string)} seq
   * @return {Cursor}
   */
  static from(seq) {
    return new Cursor(seq);
  }

  /**
   * @param {Array|string} seq
   * @param {number?} startIndex
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
     * @type {Array|string}
     */
    this.seq = seq;
  }

  next() {
    return this.seq[this.index++];
  }

  previous() {
    return this.seq[this.index - 1];
  }

  /**
   * @return {boolean}
   */
  hasNext() {
    return this.index < this.size;
  }

  peek() {
    return this.seq[this.index];
  }
}