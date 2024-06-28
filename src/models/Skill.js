export class Skill {
  constructor(name, points, relatedAttribute) {
    this.name = name;
    this.points = points;
    this.relatedAttribute = relatedAttribute;
  }

  addPoint(isIncreasing = true) {
    if (this.points > 0 || isIncreasing === true) {
      this.points += isIncreasing ? 1 : -1;
    }

    if (this.points < 0) this.points = 0;
  }

  getTotalPoints() {
    return this.points + this.relatedAttribute.modifier;
  }

  reset() {
    this.points = 0;
  }
};
