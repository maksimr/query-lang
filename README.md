# [Search Query Grammar](https://www.jetbrains.com/help/youtrack/standalone/Search-Query-Grammar.html) [![Build Status](https://github.com/maksimr/query-input/workflows/Test/badge.svg?branch=master)](https://github.com/maksimr/query-input)


```xml
    <SearchQuery> ::= <OrExpression>
    <OrExpression> ::= <AndExpression> ('or' <AndExpression>)*
    <AndExpression> ::= <AndOperand> ('and' <AndOperand>)*
    <AndOperand> ::= '('<OrExpression>? ')' | <Term>
    <Term> ::= <QuotedText> | <NegativeText> | <PositiveValue> | <NegativeValue> | <Sort> | <Has> | <CategorizedFilter> | <Text>
    <CategorizedFilter> ::= <Attribute> ':' <AttributeFilter> (',' <AttributeFilter>)*
    <AttributeFilter> ::= <Value> | <NegativeValue> | <ValueRange> | <NegativeValueRange>
    <NegativeText> ::= '-'<QuotedText>
    <QuotedText> ::= '"' TEXT WITHOUT QUOTES '"' | ''' TEXT WITHOUT QUOTES '''
    <PositiveValue> ::= '#'<Value>
    <NegativeValue> ::= '-'<Value>
    <NegativeValueRange> ::= '-'<ValueRange>
    <Sort> ::= 'sort by:' <SortField> (',' <SortField>)*
    <Has> ::= 'has:' <Attribute> (',' <Attribute>)*
    <SortField> ::= <Attribute> ('asc' | 'desc')?
    <Attribute> ::= NAME OF ISSUE FIELD
    <ValueRange> ::= <Value> '..' <Value>
    <Value> ::= <ComplexValue> | <SimpleValue>
    <SimpleValue> ::= VALUE WITHOUT SPACES
    <ComplexValue> ::= '{' VALUE (CAN HAVE SPACES) '}'
    <Text> ::= TEXT WITHOUT PARENTHESES
```
