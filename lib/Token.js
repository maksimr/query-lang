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
   */
  constructor(type, value) {
    this.type = type;
    this.lexeme = value;
  }
}