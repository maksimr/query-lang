import {Token, TokenType} from './Token';
import {Lexer} from './Lexer';
import {Cursor} from './Cursor';
import {Node} from './Node';

export class Parser {
  static Error(message = 'Unexpected token') {
    return Error(message);
  }

  static parse(query: string) {
    const tokens = Lexer.parse(query);
    const cursor = Cursor.from<Token>(tokens.filter((it) => !Token.typeOf(it, TokenType.WHITE_SPACE)));

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
        case (match(TokenType.VALUE)):
          const token = previous();
          switch (true) {
            case (match(TokenType.COLON)):
              if (match(TokenType.VALUE)) return (
                Node.Field(
                  Node.FieldName(token.value),
                  Node.FieldValue(previous().value)));

            case (match(TokenType.LEFT_PAREN)):
              const fields = [];
              while (match(TokenType.VALUE)) {
                const nameToken = previous();
                if (match(TokenType.COLON) && match(TokenType.VALUE)) {
                  const valueToken = previous();
                  fields.push(
                    Node.Field(
                      Node.FieldName(nameToken.value),
                      Node.FieldValue(valueToken.value)));
                  continue;
                }
                throw Parser.Error();
              }
              if (match(TokenType.RIGHT_PAREN))
                return Node.Tuple(Node.TupleName(token.value), fields);
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