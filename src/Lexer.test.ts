import { Lexer } from './Lexer';
import { Token } from './Token';

describe('Lexer', function() {
  it('should correctly parse empty string', function() {
    expect(Lexer.parse('')).toEqual([]);
  });

  it('should preserve spaces', function() {
    expect(Lexer.parse('  ')).toEqual([
      Token.WHITE_SPACE(' '),
      Token.WHITE_SPACE(' ')
    ]);
  });

  it('should correctly parse colon symbol', function() {
    expect(Lexer.parse(':')).toEqual([Token.COLON()]);
  });

  it('should correctly parse parens', function() {
    expect(Lexer.parse('(')).toEqual([Token.LEFT_PAREN()]);
    expect(Lexer.parse(')')).toEqual([Token.RIGHT_PAREN()]);
  });

  it('should correctly parse braces', function() {
    expect(Lexer.parse('{')).toEqual([Token.LEFT_BRACE()]);
    expect(Lexer.parse('}')).toEqual([Token.RIGHT_BRACE()]);
  });

  it('should correctly parse reserved keywords', function() {
    expect(Lexer.parse('or')).toEqual([Token.OR()]);
    expect(Lexer.parse('and')).toEqual([Token.AND()]);
    expect(Lexer.parse('not')).toEqual([Token.NOT()]);
  });

  it('should correctly parse value', function() {
    expect(Lexer.parse('foo')).toEqual([Token.VALUE('foo')]);
  });

  it('should correctly parse value inside curly braces', function() {
    expect(Lexer.parse('{foo}')).toEqual([
      Token.LEFT_BRACE(),
      Token.VALUE('foo'),
      Token.RIGHT_BRACE()
    ]);
    expect(Lexer.parse('{foo bar}')).toEqual([
      Token.LEFT_BRACE(),
      Token.VALUE('foo'),
      Token.WHITE_SPACE(' '),
      Token.VALUE('bar'),
      Token.RIGHT_BRACE()
    ]);
  });

  it('should correctly parse a query with field name and field value', function() {
    expect(Lexer.parse('foo: bar')).toEqual([
      Token.VALUE('foo'),
      Token.COLON(),
      Token.WHITE_SPACE(' '),
      Token.VALUE('bar')
    ]);
  });

  it('should not throw exception if do not know symbol', function() {
    expect(Lexer.parse('.')).toEqual([
      Token.VALUE('.')
    ]);
  });

  it('should correctly parse incomplete string', function() {
    expect(Lexer.parse('"foo')).toEqual([
      Token.VALUE('"'),
      Token.VALUE('foo')
    ]);
  });
});