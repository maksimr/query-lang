import {Token} from './Token';
import {Cursor} from './Cursor';

export class Lexer {
  static parse(query: string): Array<Token> {
    const tokens: Array<Token> = [];
    const cursor = Cursor.from<string>(query);
    while (cursor.hasNext()) {
      const char = cursor.next();
      switch (true) {
        case (':' === char):
          tokens.push(Token.COLON());
          break;
        case ('(' === char):
          tokens.push(Token.LEFT_PAREN());
          break;
        case (')' === char):
          tokens.push(Token.RIGHT_PAREN());
          break;
        case ('{' === char):
          tokens.push(Token.LEFT_BRACE());
          break;
        case ('}' === char):
          tokens.push(Token.RIGHT_BRACE());
          break;
        case (/\s/.test(char)):
          tokens.push(Token.WHITE_SPACE(char));
          break;
        case (/\w/.test(char)): {
          let value = char;
          while (cursor.hasNext() && /\w/.test(cursor.peek())) value += cursor.next();
          switch (value) {
            case 'or':
              tokens.push(Token.OR());
              break;
            case 'and':
              tokens.push(Token.AND());
              break;
            case 'not':
              tokens.push(Token.NOT());
              break;
            default:
              tokens.push(Token.VALUE(value));
              break;
          }
          break;
        }
        default:
          tokens.push(Token.VALUE(char));
          break;
      }
    }

    return tokens;
  }
}