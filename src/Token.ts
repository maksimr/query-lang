import {TokenType} from './TokenType';

export class Token {
  static typeOf(token: Token, type: TokenType) {
    return token.type === type;
  }

  type: TokenType;
  lexeme: string;

  constructor(type: TokenType, value: string = null) {
    this.type = type;
    this.lexeme = value;
  }

  static SPACE(value: string) {
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

  static WORD(lexeme: string) {
    return new Token(TokenType.WORD, lexeme);
  }

  static OR(lexeme: string) {
    return new Token(TokenType.OR, lexeme);
  }

  static AND(lexeme: string) {
    return new Token(TokenType.AND, lexeme);
  }

  static QUOTE(lexeme: string) {
    return new Token(TokenType.QUOTE, lexeme);
  }

  static PUNCTUATION(lexeme: string) {
    return new Token(TokenType.PUNCTUATION, lexeme);
  }
}