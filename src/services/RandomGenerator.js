export class RandomGenerator {
  nextInt(inclusiveLowerBound, inclusiveUpperBound) {
    return Math.ceil(inclusiveLowerBound + Math.random() * (inclusiveUpperBound - inclusiveLowerBound));
  }
}