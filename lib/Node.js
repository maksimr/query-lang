import {NodeType} from './NodeType';

export class Node {
  /**
   * @param {NodeType} type
   */
  constructor(type) {
    this.type = type;
  }

  /**
   * @param {Node} leftExpr
   * @param {Node} rightExpr
   * @return {OrExpression}
   */
  static OrExpression(leftExpr, rightExpr) {
    return new OrExpression(leftExpr, rightExpr);
  }

  /**
   * @param {Node} leftExpr
   * @param {Node} rightExpr
   * @return {AndExpression}
   */
  static AndExpression(leftExpr, rightExpr) {
    return new AndExpression(leftExpr, rightExpr);
  }

  /**
   * @param {Node} nameExpr
   * @param {Node} valueExpr
   * @return {CategorizedFilter}
   */
  static CategorizedFilter(nameExpr, valueExpr) {
    return new CategorizedFilter(nameExpr, valueExpr);
  }

  /**
   * @param {string} name
   * @return {Attribute}
   */
  static Attribute(name) {
    return new Attribute(name);
  }

  /**
   * @param {string} value
   * @return {SimpleValue}
   */
  static SimpleValue(value) {
    return new SimpleValue(value);
  }

  /**
   * @param {string} value
   * @return {QuoteText}
   */
  static QuoteText(value) {
    return new QuoteText(value);
  }

  /**
   * @param {Node} value
   * @return {NegativeText}
   */
  static NegativeText(value) {
    return new NegativeText(value);
  }
}

class LogicalExpression extends Node {
  /**
   * @param {NodeType} type
   * @param {Node} leftExpr
   * @param {Node} rightExpr
   */
  constructor(type, leftExpr, rightExpr) {
    super(type);
    this.left = leftExpr;
    this.right = rightExpr;
  }
}

class OrExpression extends LogicalExpression {
  /**
   * @param {Node} leftExpr
   * @param {Node} rightExpr
   */
  constructor(leftExpr, rightExpr) {
    super(NodeType.OR_EXPRESSION, leftExpr, rightExpr);
  }
}

class AndExpression extends LogicalExpression {
  /**
   * @param {Node} leftExpr
   * @param {Node} rightExpr
   */
  constructor(leftExpr, rightExpr) {
    super(NodeType.AND_EXPRESSION, leftExpr, rightExpr);
  }
}

class CategorizedFilter extends Node {
  /**
   * @param {Node} nameExpr
   * @param {Node} valueExpr
   */
  constructor(nameExpr, valueExpr) {
    super(NodeType.CATEGORIZED_FILTER);
    this.name = nameExpr;
    this.value = valueExpr;
  }
}

class Attribute extends Node {
  /**
   * @param {string} name
   */
  constructor(name) {
    super(NodeType.ATTRIBUTE);
    this.name = name;
  }
}

class SimpleValue extends Node {
  /**
   * @param {string} value
   */
  constructor(value) {
    super(NodeType.SIMPLE_VALUE);
    this.value = value;
  }
}

class QuoteText extends Node {
  /**
   * @param {string} value
   */
  constructor(value) {
    super(NodeType.QUOTE_TEXT);
    this.value = value;
  }
}

class NegativeText extends Node {
  /**
   * @param {Node} value
   */
  constructor(value) {
    super(NodeType.NEGATIVE_TEXT);
    this.value = value;
  }
}
