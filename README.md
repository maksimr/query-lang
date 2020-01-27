# [Search Query Grammar](https://www.jetbrains.com/help/youtrack/standalone/Search-Query-Grammar.html) [![Build Status](https://github.com/maksimr/query-input/workflows/Test/badge.svg?branch=master)](https://github.com/maksimr/query-input)


```xml
    <SearchQuery> ::= <OrExpression>
    <OrExpession> ::= <AndExpression> ('or' <AndExpression>)*
    <AndExpression> ::= <AndOperand> ('and' <AndOperand>)*
    <AndOperand> ::= '('<OrExpression>? ')' | <Term>
    <Term> ::= <QuotedText> | <NegativeText> | <PositiveValue> | <NegativeValue> | <Sort> | <Has> | <CategorizedFilter> | <Text>
    <QuotedText> ::= '"' TEXT WITHOUT QUOTES '"' | ''' TEXT WITHOUT QUOTES '''
    <NegativeText> ::= '-'<QuotedText>
    <PositiveValue> ::= '#'<Value>
    <NegativeValue> ::= '-'<Value>
    <NegativeValueRange> ::= '-'<ValueRange>
    <Sort> ::= 'sort by:' <SortField> (',' <SortField>)*
    <Has> ::= 'has:' <Attribute> (',' <Attribute>)*
    <CategorizedFilter> ::= <Attribute> ':' <AttributeFilter> (',' <AttributeFilter>)*
    <Attribute> ::= NAME OF ISSUE FIELD
    <AttributeFilter> ::= <Value> | <NegativeValue> | <ValueRange> | <NegativeValueRange>
    <ValueRange> ::= <Value> '..' <Value>
    <SortField> ::= <Attribute> ('asc' | 'desc')?
    <Value> ::= <ComplexValue> | <SimpleValue>
    <SimpleValue> ::= VALUE WITHOUT SPACES
    <ComplexValue> ::= '{' VALUE (CAN HAVE SPACES) '}'
    <Text> ::= TEXT WITHOUT PARENTHESES
```
