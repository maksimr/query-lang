export class Node {
  type: Function;
  value: any;

  constructor(type: Function, value: any) {
    this.type = type;
    this.value = value;
  }

  static OR(xExpr: Node, yExpr: Node) {
    return new Node(Node.OR, [xExpr, yExpr]);
  }

  static AND(xExpr: Node, yExpr: Node) {
    return new Node(Node.AND, [xExpr, yExpr]);
  }

  static NOT(xExpr: Node) {
    return new Node(Node.NOT, xExpr);
  }

  static Tuple(nameExpr: Node, fieldList: Array<Node>) {
    return new Node(Node.Tuple, [nameExpr, fieldList]);
  }

  static TupleName(name: string) {
    return new Node(Node.TupleName, name);
  }

  static Field(nameExpr: Node, valueExpr: Node) {
    return new Node(Node.Field, [nameExpr, valueExpr]);
  }

  static FieldName(name: string) {
    return new Node(Node.FieldName, name);
  }

  static FieldValue(value: string) {
    return new Node(Node.FieldValue, value);
  }
}