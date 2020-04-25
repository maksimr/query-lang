import {Token} from './Token';
import {Cursor} from './Cursor';
import {TokenType} from './TokenType';

export class Lexer {
  /**
   * @param {string} query
   * @return {Array}
   */
  static parse(query) {
    const tokens = [];
    const wordRegExp = /\w/;
    /**
     * @type {Cursor<string>}
     */
    const cursor = Cursor.from(query.split(''));
    while (cursor.hasNext()) {
      const char = cursor.next();
      const spaceRegExp = /\s/;
      switch (true) {
        case (':' === char):
          addToken(TokenType.COLON, char);
          break;
        case ('(' === char):
          addToken(TokenType.LEFT_PAREN, char);
          break;
        case (')' === char):
          addToken(TokenType.RIGHT_PAREN, char);
          break;
        case ('{' === char):
          addToken(TokenType.LEFT_BRACE, char);
          break;
        case ('}' === char):
          addToken(TokenType.RIGHT_BRACE, char);
          break;
        case ('"' === char || '\'' === char):
          addToken(TokenType.QUOTE, char);
          break;
        case ('-' === char):
          addToken(TokenType.MINUS, char);
          break;
        case (spaceRegExp.test(char)):
          const rest = consumeUntil(char => spaceRegExp.test(char));
          addToken(TokenType.SPACE, char + rest);
          break;
        case (wordRegExp.test(char)): {
          const rest = consumeUntil(char => (wordRegExp.test(char) || char === '-'));
          const value = char + rest;
          switch (value) {
            case 'or':
              addToken(TokenType.OR, value);
              break;
            case 'and':
              addToken(TokenType.AND, value);
              break;
            default:
              addToken(TokenType.WORD, value);
              break;
          }
          break;
        }
        default:
          addToken(TokenType.PUNCTUATION, char);
          break;
      }
    }

    return tokens;

    /**
     * @param {TokenType} tokenType
     * @param {string} lexeme
     */
    function addToken(tokenType, lexeme) {
      const start = cursor.currentPosition() - lexeme.length;
      tokens.push(new Token(tokenType, lexeme, start));
    }

    /**
     *
     * @param {function(string):boolean} predicateFunc
     * @return {string}
     */
    function consumeUntil(predicateFunc) {
      let value = '';
      while (cursor.hasNext() && predicateFunc(cursor.peek()))
        value += cursor.next();
      return value;
    }
  }
}