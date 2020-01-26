import {Token} from './Token';
import {Cursor} from './Cursor';

export class Lexer {
  static parse(query: string): Array<Token> {
    const tokens: Array<Token> = [];
    const wordRegExp = /\w/;
    const cursor = Cursor.from<string>(query);
    while (cursor.hasNext()) {
      const char = cursor.next();
      switch (true) {
        case (':' === char):
          addToken(Token.COLON());
          break;
        case ('(' === char):
          addToken(Token.LEFT_PAREN());
          break;
        case (')' === char):
          addToken(Token.RIGHT_PAREN());
          break;
        case ('{' === char):
          addToken(Token.LEFT_BRACE());
          break;
        case ('}' === char):
          addToken(Token.RIGHT_BRACE());
          break;
        case ('"' === char || '\'' === char):
          addToken(Token.QUOTE(char));
          break;
        case (/\s/.test(char)):
          addToken(Token.WHITE_SPACE(char));
          break;
        case (wordRegExp.test(char)): {
          let value = char;
          while (cursor.hasNext() && wordRegExp.test(cursor.peek())) value += cursor.next();
          switch (value) {
            case 'or':
              addToken(Token.OR(value));
              break;
            case 'and':
              addToken(Token.AND(value));
              break;
            case 'not':
              addToken(Token.NOT(value));
              break;
            default:
              addToken(Token.WORD(value));
              break;
          }
          break;
        }
        default:
          addToken(Token.WORD(char));
          break;
      }
    }

    return tokens;

    function addToken(token: Token) {
      tokens.push(token);
    }
  }
}