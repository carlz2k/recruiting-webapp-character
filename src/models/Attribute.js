import { ININITIAL_ATTRIBUTE_POINT } from "../consts";

export class Attribute {
  constructor(name, points) {
    this.name = name;
    this.points = points;
    this._calculateModifier();
  }

  add(increment) {
    this.points += increment;

    if (this.points < 0) this.points = 0;

    this._calculateModifier();
  }

  reset() {
    this.points = ININITIAL_ATTRIBUTE_POINT;
    this.modifier = 0;
  }

  _calculateModifier() {
    this.modifier = Math.floor((this.points - ININITIAL_ATTRIBUTE_POINT) / 2);
  }
}