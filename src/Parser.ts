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

    return SearchQuery();

    function SearchQuery() {
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
      let expr = AndOperand();
      while (match(TokenType.AND)) expr = Node.AND(expr, AndOperand());
      return expr;
    }

    function AndOperand() {
      return Term();
    }

    function Term() {
      return CategorizedFilter();
    }

    function CategorizedFilter() {
      const attribute = Attribute();
      if (!match(TokenType.COLON)) throw Parser.Error();
      return Node.Field(attribute, AttributeFilter());
    }

    function Attribute() {
      if (!match(TokenType.WORD)) throw Parser.Error();
      return Node.FieldName(previous().lexeme);
    }

    function AttributeFilter() {
      return Value();
    }

    function Value() {
      return SimpleValue();
    }

    function SimpleValue() {
      if (!match(TokenType.WORD)) throw Parser.Error();
      return Node.FieldValue(previous().lexeme);
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