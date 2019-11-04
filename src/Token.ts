export class Token {
  static typeOf(token: Token, type: Function) {
    return token.type === type;
  }

  type: Function;
  value: string;

  constructor(type: Function, value: string = null) {
    this.type = type;
    this.value = value;
  }

  static WHITE_SPACE(value: string) {
    return new Token(Token.WHITE_SPACE, value);
  }

  static COLON() {
    return new Token(Token.COLON);
  }

  static LEFT_PAREN() {
    return new Token(Token.LEFT_PAREN);
  }

  static RIGHT_PAREN() {
    return new Token(Token.RIGHT_PAREN);
  }

  static LEFT_BRACE() {
    return new Token(Token.LEFT_BRACE);
  }

  static RIGHT_BRACE() {
    return new Token(Token.RIGHT_BRACE);
  }

  static VALUE(value: string) {
    return new Token(Token.VALUE, value);
  }

  static OR() {
    return new Token(Token.OR);
  }

  static AND() {
    return new Token(Token.AND);
  }

  static NOT() {
    return new Token(Token.NOT);
  }
}