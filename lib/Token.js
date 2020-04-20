import {TokenType} from './TokenType';

export class Token {
  /**
   * @param {Token} token
   * @param {TokenType} type
   * @return {boolean}
   */
  static typeOf(token, type) {
    return token.type === type;
  }

  constructor(type, value) {
    /**
     * @type {TokenType}
     */
    this.type = type;
    /**
     * @type {(string|null)}
     */
    this.lexeme = value;
  }

  /**
   * @param {string} value
   * @return {Token}
   */
  static SPACE(value) {
    return new Token(TokenType.SPACE, value);
  }

  static COLON() {
    return new Token(TokenType.COLON);
  }

  static LEFT_PAREN() {
    return new Token(TokenType.LEFT_PAREN);
  }

  static RIGHT_PAREN() {
    return new Token(TokenType.RIGHT_PAREN);
  }

  static LEFT_BRACE() {
    return new Token(TokenType.LEFT_BRACE);
  }

  static RIGHT_BRACE() {
    return new Token(TokenType.RIGHT_BRACE);
  }

  /**
   * @param {string} lexeme
   * @return {Token}
   */
  static WORD(lexeme) {
    return new Token(TokenType.WORD, lexeme);
  }

  /**
   * @param {string} lexeme
   * @return {Token}
   */
  static OR(lexeme) {
    return new Token(TokenType.OR, lexeme);
  }

  /**
   * @param {string} lexeme
   * @return {Token}
   */
  static AND(lexeme) {
    return new Token(TokenType.AND, lexeme);
  }

  /**
   * @param {string} lexeme
   * @return {Token}
   */
  static QUOTE(lexeme) {
    return new Token(TokenType.QUOTE, lexeme);
  }

  /**
   * @param {string} lexeme
   * @return {Token}
   */
  static PUNCTUATION(lexeme) {
    return new Token(TokenType.PUNCTUATION, lexeme);
  }

  /**
   * @param {string} lexeme
   * @return {Token}
   */
  static MINUS(lexeme) {
    return new Token(TokenType.MINUS, lexeme);
  }
}