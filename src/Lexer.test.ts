import {Lexer} from './Lexer';
import {Token} from './Token';

describe('Lexer', function() {
  it('should correctly parse empty string', function() {
    expect(Lexer.parse('')).toEqual([]);
  });

  it('should parse space', function() {
    expect(Lexer.parse(' ')).toEqual([
      Token.WHITE_SPACE(' ')
    ]);
  });

  it('should consolidate sequence of spaces', function() {
    expect(Lexer.parse('  ')).toEqual([
      Token.WHITE_SPACE('  ')
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
    expect(Lexer.parse('or')).toEqual([Token.OR('or')]);
    expect(Lexer.parse('and')).toEqual([Token.AND('and')]);
    expect(Lexer.parse('not')).toEqual([Token.NOT('not')]);
  });

  it('should correctly parse word', function() {
    expect(Lexer.parse('foo')).toEqual([Token.WORD('foo')]);
  });

  it('should correctly parse word inside curly braces', function() {
    expect(Lexer.parse('{foo}')).toEqual([
      Token.LEFT_BRACE(),
      Token.WORD('foo'),
      Token.RIGHT_BRACE()
    ]);
    expect(Lexer.parse('{foo bar}')).toEqual([
      Token.LEFT_BRACE(),
      Token.WORD('foo'),
      Token.WHITE_SPACE(' '),
      Token.WORD('bar'),
      Token.RIGHT_BRACE()
    ]);
  });

  it('should correctly parse a query with field name and field value', function() {
    expect(Lexer.parse('foo: bar')).toEqual([
      Token.WORD('foo'),
      Token.COLON(),
      Token.WHITE_SPACE(' '),
      Token.WORD('bar')
    ]);
  });

  it('should parse double quote', function() {
    expect(Lexer.parse('"')).toEqual([
      Token.QUOTE('"')
    ]);
  });

  it('should parse single quote', function() {
    expect(Lexer.parse('\'')).toEqual([
      Token.QUOTE('\'')
    ]);
  });

  it('should correctly parse incomplete string', function() {
    expect(Lexer.parse('"foo')).toEqual([
      Token.QUOTE('"'),
      Token.WORD('foo')
    ]);
  });

  it('should correctly parse a word with dash', function() {
    expect(Lexer.parse('foo-bar')).toEqual([
      Token.WORD('foo'),
      Token.DASH('-'),
      Token.WORD('bar')
    ]);
  });

  it('should not throw exception if do not know symbol', function() {
    expect(Lexer.parse('.')).toEqual([
      Token.PUNCTUATION('.')
    ]);
  });
});