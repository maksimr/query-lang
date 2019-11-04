import { Lexer } from './Lexer';
import { Token } from './Token';
import { deepStrictEqual } from 'assert';

describe('Lexer', function() {
  it('should correctly parse empty string', function() {
    deepStrictEqual(Lexer.parse(''), []);
  });

  it('should preserve spaces', function() {
    deepStrictEqual(Lexer.parse('  '), [
      Token.WHITE_SPACE(' '),
      Token.WHITE_SPACE(' ')
    ]);
  });

  it('should correctly parse colon symbol', function() {
    deepStrictEqual(Lexer.parse(':'), [Token.COLON()]);
  });

  it('should correctly parse parens', function() {
    deepStrictEqual(Lexer.parse('('), [Token.LEFT_PAREN()]);
    deepStrictEqual(Lexer.parse(')'), [Token.RIGHT_PAREN()]);
  });

  it('should correctly parse braces', function() {
    deepStrictEqual(Lexer.parse('{'), [Token.LEFT_BRACE()]);
    deepStrictEqual(Lexer.parse('}'), [Token.RIGHT_BRACE()]);
  });

  it('should correctly parse reserved keywords', function() {
    deepStrictEqual(Lexer.parse('or'), [Token.OR()]);
    deepStrictEqual(Lexer.parse('and'), [Token.AND()]);
    deepStrictEqual(Lexer.parse('not'), [Token.NOT()]);
  });

  it('should correctly parse value', function() {
    deepStrictEqual(Lexer.parse('foo'), [Token.VALUE('foo')]);
  });

  it('should correctly parse value inside curly braces', function() {
    deepStrictEqual(Lexer.parse('{foo}'), [
      Token.LEFT_BRACE(),
      Token.VALUE('foo'),
      Token.RIGHT_BRACE()
    ]);
    deepStrictEqual(Lexer.parse('{foo bar}'), [
      Token.LEFT_BRACE(),
      Token.VALUE('foo'),
      Token.WHITE_SPACE(' '),
      Token.VALUE('bar'),
      Token.RIGHT_BRACE()
    ]);
  });

  it('should correctly parse query with field name and field value', function() {
    deepStrictEqual(Lexer.parse('foo: bar'), [
      Token.VALUE('foo'),
      Token.COLON(),
      Token.WHITE_SPACE(' '),
      Token.VALUE('bar')
    ]);
  });

  it('should not throw exception if do not know symbol', function() {
    deepStrictEqual(Lexer.parse('.'), [
      Token.VALUE('.')
    ]);
  });
});