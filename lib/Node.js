export class Node {
  /**
   * @param {Function} type
   * @param {any} value
   */
  constructor(type, value) {
    /**
     * @type {Function}
     */
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
    return new Node(Node.OrExpression, [xExpr, yExpr]);
  }

  /**
   * @param {Node} xExpr
   * @param {Node} yExpr
   * @return {Node}
   */
  static AndExpression(xExpr, yExpr) {
    return new Node(Node.AndExpression, [xExpr, yExpr]);
  }

  /**
   * @param {Node} nameExpr
   * @param {Node} valueExpr
   * @return {Node}
   */
  static CategorizedFilter(nameExpr, valueExpr) {
    return new Node(Node.CategorizedFilter, [nameExpr, valueExpr]);
  }

  /**
   * @param {string} name
   * @return {Node}
   */
  static Attribute(name) {
    return new Node(Node.Attribute, name);
  }

  /**
   * @param {string} value
   * @return {Node}
   */
  static SimpleValue(value) {
    return new Node(Node.SimpleValue, value);
  }

  /**
   * @param {string} value
   * @return {Node}
   */
  static QuoteText(value) {
    return new Node(Node.QuoteText, value);
  }

  /**
   * @param {Node} value
   * @return {Node}
   */
  static NegativeText(value) {
    return new Node(Node.NegativeText, value);
  }
}