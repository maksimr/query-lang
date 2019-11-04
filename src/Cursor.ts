export class Cursor<T> {
  static from<T>(seq: Array<T>) {
    return new Cursor<T>(seq);
  }

  index: number;
  size: number;
  seq: Array<T>;

  constructor(seq: Array<T>, startIndex = 0) {
    this.index = startIndex;
    this.size = seq.length;
    this.seq = seq;
  }

  next(): T {
    return this.seq[this.index++];
  }

  previous(): T {
    return this.seq[this.index - 1];
  }

  hasNext(): boolean {
    return this.index < this.size;
  }

  peek(): T {
    return this.seq[this.index];
  }
}