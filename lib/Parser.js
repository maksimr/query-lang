import {Token} from './Token';
import {Lexer} from './Lexer';
import {Cursor} from './Cursor';
import {Node} from './Node';
import {TokenType} from './TokenType';

export class Parser {
  static Error(message = 'Unexpected token') {
    return Error(message);
  }

  /**
   *
   * @param {string} query
   * @return {(Node|null)}
   */
  static parse(query) {
    const tokens = Lexer.parse(query);
    /**
     * @type {Cursor<Token>}
     */
    const cursor = Cursor.from(tokens.filter((it) => !Token.typeOf(it, TokenType.SPACE)));

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
      switch (true) {
        case (Boolean(match(TokenType.QUOTE))):
          return QuoteText();
        case (Boolean(match(TokenType.MINUS) && match(TokenType.QUOTE))):
          return NegativeText();
        default:
          return CategorizedFilter();
      }
    }

    function QuoteText() {
      let text = '';
      while (!match(TokenType.QUOTE) && !isAtEnd()) {
        const token = cursor.next();
        text += token.lexeme;
      }
      return Node.QuoteText(text);
    }


    function NegativeText() {
      return Node.NegativeText(QuoteText());
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

    /**
     * @param {TokenType} type
     * @return {Token|null}
     */
    function match(type) {
      return check(type) ? cursor.next() : null;
    }

    /**
     * @param {TokenType} type
     * @return {boolean}
     */
    function check(type) {
      if (isAtEnd()) return false;
      return Token.typeOf(cursor.peek(), type);
    }

    function isAtEnd() {
      return !cursor.hasNext();
    }
  }
}