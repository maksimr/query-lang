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
   * @constructor
   */
  static OrExpression(xExpr, yExpr) {
    return new Node(Node.OrExpression, [xExpr, yExpr]);
  }

  /**
   * @param {Node} xExpr
   * @param {Node} yExpr
   * @constructor
   */
  static AndExpression(xExpr, yExpr) {
    return new Node(Node.AndExpression, [xExpr, yExpr]);
  }

  /**
   * @param {Node} nameExpr
   * @param {Node} valueExpr
   * @constructor
   */
  static CategorizedFilter(nameExpr, valueExpr) {
    return new Node(Node.CategorizedFilter, [nameExpr, valueExpr]);
  }

  /**
   * @param {string} name
   * @constructor
   */
  static Attribute(name) {
    return new Node(Node.Attribute, name);
  }

  /**
   * @param {string} value
   * @constructor
   */
  static SimpleValue(value) {
    return new Node(Node.SimpleValue, value);
  }

  /**
   * @param {string} value
   * @constructor
   */
  static QuoteText(value) {
    return new Node(Node.QuoteText, value);
  }

  /**
   * @param {Node} value
   * @constructor
   */
  static NegativeText(value) {
    return new Node(Node.NegativeText, value);
  }
}