import {TokenType} from './TokenType';

export class Token {
  static typeOf(token, type) {
    return token.type === type;
  }

  constructor(type, value = null) {
    this.type = type;
    this.lexeme = value;
  }

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

  static WORD(lexeme) {
    return new Token(TokenType.WORD, lexeme);
  }

  static OR(lexeme) {
    return new Token(TokenType.OR, lexeme);
  }

  static AND(lexeme) {
    return new Token(TokenType.AND, lexeme);
  }

  static QUOTE(lexeme) {
    return new Token(TokenType.QUOTE, lexeme);
  }

  static PUNCTUATION(lexeme) {
    return new Token(TokenType.PUNCTUATION, lexeme);
  }

  static MINUS(lexeme) {
    return new Token(TokenType.MINUS, lexeme);
  }
}