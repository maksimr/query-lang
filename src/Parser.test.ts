import {Parser} from './Parser';
import {Node} from './Node';

describe('Parser', function() {
  it('should correctly parse empty string', function() {
    expect(Parser.parse('')).toEqual(null);
  });

  it('should correctly parse Field expression', function() {
    expect(Parser.parse('foo: bar')).toEqual(Node.CategorizedFilter(
      Node.Attribute('foo'),
      Node.SimpleValue('bar')
    ));
  });

  it('should correctly parse "or" expression', function() {
    expect(Parser.parse('foo: bar or bar: foo')).toEqual(Node.OrExpression(
      Node.CategorizedFilter(Node.Attribute('foo'), Node.SimpleValue('bar')),
      Node.CategorizedFilter(Node.Attribute('bar'), Node.SimpleValue('foo'))
    ));
  });

  it('should correctly parse multiple "or" expressions ("or" is LEFT ASSOCIATIVE)', function() {
    expect(Parser.parse('foo: bar or bar: foo or zoo: moo')).toEqual(Node.OrExpression(
      Node.OrExpression(
        Node.CategorizedFilter(Node.Attribute('foo'), Node.SimpleValue('bar')),
        Node.CategorizedFilter(Node.Attribute('bar'), Node.SimpleValue('foo'))
      ),
      Node.CategorizedFilter(Node.Attribute('zoo'), Node.SimpleValue('moo'))
    ));
  });

  it('should correctly parse "and" expression', function() {
    expect(Parser.parse('foo: bar and bar: foo')).toEqual(Node.AndExpression(
      Node.CategorizedFilter(Node.Attribute('foo'), Node.SimpleValue('bar')),
      Node.CategorizedFilter(Node.Attribute('bar'), Node.SimpleValue('foo'))
    ));
  });

  it('should correctly parse multiple "and" expressions ("and" - is LEFT ASSOCIATIVE)', function() {
    expect(Parser.parse('foo: bar and bar: foo and zoo: moo')).toEqual(Node.AndExpression(
      Node.AndExpression(
        Node.CategorizedFilter(Node.Attribute('foo'), Node.SimpleValue('bar')),
        Node.CategorizedFilter(Node.Attribute('bar'), Node.SimpleValue('foo'))
      ),
      Node.CategorizedFilter(Node.Attribute('zoo'), Node.SimpleValue('moo'))
    ));
  });

  it('should parse double quoted text', function() {
    expect(Parser.parse('"foo"')).toEqual(
      Node.QuoteText('foo')
    );
  });

  it('should parse single quoted text', function() {
    expect(Parser.parse('\'foo\'')).toEqual(
      Node.QuoteText('foo')
    );
  });

  it('should parse negative text', function() {
    expect(Parser.parse('-"foo"')).toEqual(
      Node.NegativeText(Node.QuoteText('foo'))
    );
  });
});