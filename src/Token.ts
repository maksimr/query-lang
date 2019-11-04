export enum TokenType {
  WHITE_SPACE,
  COLON,
  LEFT_PAREN,
  RIGHT_PAREN,
  LEFT_BRACE,
  RIGHT_BRACE,
  VALUE,
  OR,
  AND,
  NOT,
}


export class Token {
  static typeOf(token: Token, type: TokenType) {
    return token.type === type;
  }

  type: TokenType;
  value: string;

  constructor(type: TokenType, value: string = null) {
    this.type = type;
    this.value = value;
  }

  static WHITE_SPACE(value: string) {
    return new Token(TokenType.WHITE_SPACE, value);
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

  static VALUE(value: string) {
    return new Token(TokenType.VALUE, value);
  }

  static OR() {
    return new Token(TokenType.OR);
  }

  static AND() {
    return new Token(TokenType.AND);
  }

  static NOT() {
    return new Token(TokenType.NOT);
  }
}