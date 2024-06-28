import { ININITIAL_ATTRIBUTE_POINT } from "../consts";

export class Attribute {
  constructor(name, points, modifier) {
    this.name = name;
    this.points = points;
    this.modifier = modifier;
  }

  add(modifierIncrement) {
    if (this.points>0 || modifierIncrement > 0) {
      this.modifier += modifierIncrement;
      this.points += modifierIncrement * 2;
    }

    if (this.points < 0) this.points = 0;
  }

  reset() {
    this.points = ININITIAL_ATTRIBUTE_POINT;
    this.modifier = 0;
  }
}