export class Cursor<T> {
  static from<T>(seq: ArrayLike<T>) {
    return new Cursor<T>(seq);
  }

  private index: number;
  private readonly size: number;
  private readonly seq: ArrayLike<T>;

  constructor(seq: ArrayLike<T>, startIndex = 0) {
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