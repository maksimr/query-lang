import {Lexer} from './Lexer';
import {Token} from './Token';
import {TokenType} from './TokenType';

describe('Lexer', function() {
  it('should correctly parse empty string', function() {
    expect(Lexer.parse('')).toEqual([]);
  });

  it('should parse space', function() {
    expect(Lexer.parse(' ')).toEqual([
      new Token(TokenType.SPACE, ' ')
    ]);
  });

  it('should consolidate sequence of spaces', function() {
    expect(Lexer.parse('  ')).toEqual([
      new Token(TokenType.SPACE, '  ')
    ]);
  });

  it('should correctly parse colon symbol', function() {
    expect(Lexer.parse(':')).toEqual([new Token(TokenType.COLON, ':')]);
  });

  it('should correctly parse parens', function() {
    expect(Lexer.parse('(')).toEqual([new Token(TokenType.LEFT_PAREN, '(')]);
    expect(Lexer.parse(')')).toEqual([new Token(TokenType.RIGHT_PAREN, ')')]);
  });

  it('should correctly parse braces', function() {
    expect(Lexer.parse('{')).toEqual([new Token(TokenType.LEFT_BRACE, '{')]);
    expect(Lexer.parse('}')).toEqual([new Token(TokenType.RIGHT_BRACE, '}')]);
  });

  it('should correctly parse reserved keywords', function() {
    expect(Lexer.parse('or')).toEqual([new Token(TokenType.OR, 'or')]);
    expect(Lexer.parse('and')).toEqual([new Token(TokenType.AND, 'and')]);
  });

  it('should correctly parse word', function() {
    expect(Lexer.parse('foo')).toEqual([new Token(TokenType.CHARSET, 'foo')]);
  });

  it('should correctly parse word inside curly braces', function() {
    expect(Lexer.parse('{foo}')).toEqual([
      new Token(TokenType.LEFT_BRACE, '{', 0),
      new Token(TokenType.CHARSET, 'foo', 1),
      new Token(TokenType.RIGHT_BRACE, '}', 4)
    ]);
    expect(Lexer.parse('{foo bar}')).toEqual([
      new Token(TokenType.LEFT_BRACE, '{', 0),
      new Token(TokenType.CHARSET, 'foo', 1),
      new Token(TokenType.SPACE, ' ', 4),
      new Token(TokenType.CHARSET, 'bar', 5),
      new Token(TokenType.RIGHT_BRACE, '}', 8)
    ]);
  });

  it('should correctly parse a query with field name and field value', function() {
    expect(Lexer.parse('foo: bar')).toEqual([
      new Token(TokenType.CHARSET, 'foo', 0),
      new Token(TokenType.COLON, ':', 3),
      new Token(TokenType.SPACE, ' ', 4),
      new Token(TokenType.CHARSET, 'bar', 5)
    ]);
  });

  it('should parse double quote', function() {
    expect(Lexer.parse('"')).toEqual([
      new Token(TokenType.QUOTE, '"')
    ]);
  });

  it('should parse single quote', function() {
    expect(Lexer.parse('\'')).toEqual([
      new Token(TokenType.QUOTE, '\'')
    ]);
  });

  it('should correctly parse incomplete string', function() {
    expect(Lexer.parse('"foo')).toEqual([
      new Token(TokenType.QUOTE, '"', 0),
      new Token(TokenType.CHARSET, 'foo', 1)
    ]);
  });

  it('should correctly parse a word with dash', function() {
    expect(Lexer.parse('foo-bar')).toEqual([
      new Token(TokenType.CHARSET, 'foo-bar')
    ]);
  });

  it('should not throw exception if do not know symbol', function() {
    expect(Lexer.parse('.')).toEqual([
      new Token(TokenType.CHAR, '.')
    ]);
  });

  it('should parse minus sign', function() {
    expect(Lexer.parse('-')).toEqual([
      new Token(TokenType.MINUS, '-')
    ]);
  });
});