export class Node {
  type: Function;
  value: any;

  constructor(type: Function, value: any) {
    this.type = type;
    this.value = value;
  }

  static OrExpression(xExpr: Node, yExpr: Node) {
    return new Node(Node.OrExpression, [xExpr, yExpr]);
  }

  static AndExpression(xExpr: Node, yExpr: Node) {
    return new Node(Node.AndExpression, [xExpr, yExpr]);
  }

  static CategorizedFilter(nameExpr: Node, valueExpr: Node) {
    return new Node(Node.CategorizedFilter, [nameExpr, valueExpr]);
  }

  static Attribute(name: string) {
    return new Node(Node.Attribute, name);
  }

  static SimpleValue(value: string) {
    return new Node(Node.SimpleValue, value);
  }

  static QuoteText(value: string) {
    return new Node(Node.QuoteText, value);
  }

  static NegativeText(value: Node) {
    return new Node(Node.NegativeText, value);
  }
}