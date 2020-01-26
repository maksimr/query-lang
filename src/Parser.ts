import {Token} from './Token';
import {Lexer} from './Lexer';
import {Cursor} from './Cursor';
import {Node} from './Node';
import {TokenType} from './TokenType';

export class Parser {
  static Error(message = 'Unexpected token') {
    return Error(message);
  }

  static parse(query: string) {
    const tokens = Lexer.parse(query);
    const cursor = Cursor.from<Token>(tokens.filter((it) => !Token.typeOf(it, TokenType.SPACE)));

    return Query();

    function Query() {
      if (isAtEnd()) return null;
      const expr = OrExpression();
      if (!isAtEnd()) throw Parser.Error();
      return expr;
    }

    function OrExpression() {
      let expr = AndExpression();
      while (match(TokenType.OR)) expr = Node.OR(expr, AndExpression());
      return expr;
    }

    function AndExpression() {
      let expr = SignExpression();
      while (match(TokenType.AND)) expr = Node.AND(expr, SignExpression());
      return expr;
    }

    function SignExpression() {
      return (match(TokenType.NOT) ? Node.NOT(Item()) : Item());
    }

    function Item() {
      switch (true) {
        case (match(TokenType.WORD)):
          const token = previous();
          switch (true) {
            case (match(TokenType.COLON)):
              if (match(TokenType.WORD)) return (
                Node.Field(
                  Node.FieldName(token.lexeme),
                  Node.FieldValue(previous().lexeme)));

            case (match(TokenType.LEFT_PAREN)):
              const fields = [];
              while (match(TokenType.WORD)) {
                const nameToken = previous();
                if (match(TokenType.COLON) && match(TokenType.WORD)) {
                  const valueToken = previous();
                  fields.push(
                    Node.Field(
                      Node.FieldName(nameToken.lexeme),
                      Node.FieldValue(valueToken.lexeme)));
                  continue;
                }
                throw Parser.Error();
              }
              if (match(TokenType.RIGHT_PAREN))
                return Node.Tuple(Node.TupleName(token.lexeme), fields);
          }
        default:
          throw Parser.Error();
      }
    }

    function isAtEnd() {
      return !cursor.hasNext();
    }

    function match(type: TokenType) {
      if (check(type)) {
        next();
        return true;
      }
      return false;
    }

    function check(type: TokenType) {
      if (isAtEnd()) return false;
      return Token.typeOf(peek(), type);
    }

    function previous() {
      return cursor.previous();
    }

    function next() {
      return cursor.next();
    }

    function peek() {
      return cursor.peek();
    }
  }
}