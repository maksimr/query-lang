/** @typedef {import('./TokenType').TokenType} TokenType */

export class Token {
  /**
   * @param {Token} token
   * @param {TokenType} type
   * @return {boolean}
   */
  static typeOf(token, type) {
    return token.type === type;
  }

  /**
   * @param {TokenType} type
   * @param {string} value
   * @param {number} start
   */
  constructor(type, value, start = 0) {
    this.type = type;
    this.lexeme = value;
    this.start = start;
    this.end = start + value.length;
  }
}