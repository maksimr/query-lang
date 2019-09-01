import { Lexer } from './Lexer';
import { Token } from './Token';
import { deepStrictEqual, throws } from 'assert';

describe('Lexer', function() {
  it('should correctly parse empty string', function() {
    deepStrictEqual(Lexer.parse(''), []);
  });

  it('should correctly parse string with spaces only', function() {
    deepStrictEqual(Lexer.parse('    '), []);
  });

  it('should correctly parse colon symbol', function() {
    deepStrictEqual(Lexer.parse(':'), [Token.COLON()]);
  });

  it('should correctly parse parens', function() {
    deepStrictEqual(Lexer.parse('('), [Token.LEFT_PAREN()]);
    deepStrictEqual(Lexer.parse(')'), [Token.RIGHT_PAREN()]);
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
    deepStrictEqual(Lexer.parse('{foo}'), [Token.VALUE('foo')]);
    deepStrictEqual(Lexer.parse('{foo bar}'), [Token.VALUE('foo bar')]);
  });

  it('should correctly parse query with field name and field value', function() {
    deepStrictEqual(Lexer.parse('foo: bar'), [
      Token.VALUE('foo'),
      Token.COLON(),
      Token.VALUE('bar')
    ]);
  });

  it('should throw error for unmatched curly brace', function() {
    throws(() => Lexer.parse('{foo'), /Unterminated "{"/);
  });
});