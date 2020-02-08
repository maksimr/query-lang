export class Node {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  static OrExpression(xExpr, yExpr) {
    return new Node(Node.OrExpression, [xExpr, yExpr]);
  }

  static AndExpression(xExpr, yExpr) {
    return new Node(Node.AndExpression, [xExpr, yExpr]);
  }

  static CategorizedFilter(nameExpr, valueExpr) {
    return new Node(Node.CategorizedFilter, [nameExpr, valueExpr]);
  }

  static Attribute(name) {
    return new Node(Node.Attribute, name);
  }

  static SimpleValue(value) {
    return new Node(Node.SimpleValue, value);
  }

  static QuoteText(value) {
    return new Node(Node.QuoteText, value);
  }

  static NegativeText(value) {
    return new Node(Node.NegativeText, value);
  }
}