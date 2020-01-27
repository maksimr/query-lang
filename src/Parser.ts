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
      return isAtEnd() ? null : OrExpression();
    }

    function OrExpression() {
      let expr = AndExpression();
      while (match(TokenType.OR))
        expr = Node.OrExpression(expr, AndExpression());
      return expr;
    }

    function AndExpression() {
      let expr = AndOperand();
      while (match(TokenType.AND))
        expr = Node.AndExpression(expr, AndOperand());
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
      if (match(TokenType.COLON))
        return Node.CategorizedFilter(attribute, AttributeFilter());
      throw Parser.Error();
    }

    function Attribute() {
      let token = match(TokenType.WORD);
      if (token)
        return Node.Attribute(token.lexeme);
      throw Parser.Error();
    }

    function AttributeFilter() {
      return Value();
    }

    function Value() {
      return SimpleValue();
    }

    function SimpleValue() {
      let token = match(TokenType.WORD);
      if (token)
        return Node.SimpleValue(token.lexeme);
      throw Parser.Error();
    }

    function match(type: TokenType): Token {
      return check(type) ? cursor.next() : null;
    }

    function check(type: TokenType) {
      if (isAtEnd()) return false;
      return Token.typeOf(cursor.peek(), type);
    }

    function isAtEnd() {
      return !cursor.hasNext();
    }
  }
}