import {NodeType} from './NodeType';

export class Node {
  /**
   * @param {NodeType} type
   * @param {any} value
   */
  constructor(type, value) {
    this.type = type;
    /**
     * @type {any}
     */
    this.value = value;
  }

  /**
   * @param {Node} xExpr
   * @param {Node} yExpr
   * @return {Node}
   */
  static OrExpression(xExpr, yExpr) {
    return new Node(NodeType.OR_EXPRESSION, [xExpr, yExpr]);
  }

  /**
   * @param {Node} xExpr
   * @param {Node} yExpr
   * @return {Node}
   */
  static AndExpression(xExpr, yExpr) {
    return new Node(NodeType.AND_EXPRESSION, [xExpr, yExpr]);
  }

  /**
   * @param {Node} nameExpr
   * @param {Node} valueExpr
   * @return {Node}
   */
  static CategorizedFilter(nameExpr, valueExpr) {
    return new Node(NodeType.CATEGORIZED_FILTER, [nameExpr, valueExpr]);
  }

  /**
   * @param {string} name
   * @return {Node}
   */
  static Attribute(name) {
    return new Node(NodeType.ATTRIBUTE, name);
  }

  /**
   * @param {string} value
   * @return {Node}
   */
  static SimpleValue(value) {
    return new Node(NodeType.SIMPLE_VALUE, value);
  }

  /**
   * @param {string} value
   * @return {Node}
   */
  static QuoteText(value) {
    return new Node(NodeType.QUOTE_TEXT, value);
  }

  /**
   * @param {Node} value
   * @return {Node}
   */
  static NegativeText(value) {
    return new Node(NodeType.NEGATIVE_TEXT, value);
  }
}