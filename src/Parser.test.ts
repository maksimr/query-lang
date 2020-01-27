import {Parser} from './Parser';
import {Node} from './Node';

describe('Parser', function() {
  it('should correctly parse empty string', function() {
    expect(Parser.parse('')).toEqual(null);
  });

  it('should correctly parse Field expression', function() {
    expect(Parser.parse('foo: bar')).toEqual(Node.Field(
      Node.FieldName('foo'),
      Node.FieldValue('bar')
    ));
  });

  it('should correctly parse "or" expression', function() {
    expect(Parser.parse('foo: bar or bar: foo')).toEqual(Node.OR(
      Node.Field(Node.FieldName('foo'), Node.FieldValue('bar')),
      Node.Field(Node.FieldName('bar'), Node.FieldValue('foo'))
    ));
  });

  it('should correctly parse multiple "or" expressions ("or" is LEFT ASSOCIATIVE)', function() {
    expect(Parser.parse('foo: bar or bar: foo or zoo: moo')).toEqual(Node.OR(
      Node.OR(
        Node.Field(Node.FieldName('foo'), Node.FieldValue('bar')),
        Node.Field(Node.FieldName('bar'), Node.FieldValue('foo'))
      ),
      Node.Field(Node.FieldName('zoo'), Node.FieldValue('moo'))
    ));
  });

  it('should correctly parse "and" expression', function() {
    expect(Parser.parse('foo: bar and bar: foo')).toEqual(Node.AND(
      Node.Field(Node.FieldName('foo'), Node.FieldValue('bar')),
      Node.Field(Node.FieldName('bar'), Node.FieldValue('foo'))
    ));
  });

  it('should correctly parse multiple "and" expressions ("and" - is LEFT ASSOCIATIVE)', function() {
    expect(Parser.parse('foo: bar and bar: foo and zoo: moo')).toEqual(Node.AND(
      Node.AND(
        Node.Field(Node.FieldName('foo'), Node.FieldValue('bar')),
        Node.Field(Node.FieldName('bar'), Node.FieldValue('foo'))
      ),
      Node.Field(Node.FieldName('zoo'), Node.FieldValue('moo'))
    ));
  });

  describe('Error', function() {
    const UNEXPECTED_TOKEN = /Unexpected token/;

    it('should throw error if "Field" expression is incomplete', function() {
      expect(() => Parser.parse('foo: ')).toThrow(UNEXPECTED_TOKEN);
    });

    it('should throw error if "or" expression is incomplete', function() {
      expect(() => Parser.parse('foo: bar or')).toThrow(UNEXPECTED_TOKEN);
    });

    it('should throw error if "and" expression is incomplete', function() {
      expect(() => Parser.parse('foo: bar and')).toThrow(UNEXPECTED_TOKEN);
    });

    it('should throw error if query expression is invalid', function() {
      expect(() => Parser.parse('foo: bar foo')).toThrow(UNEXPECTED_TOKEN);
    });
  });
});