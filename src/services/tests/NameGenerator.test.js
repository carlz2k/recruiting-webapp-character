import { NameGenerator } from "../NameGenerator";

describe('NameGeneratorTest', () => {
  let nameGenerator;

  beforeEach(() => {
    nameGenerator = new NameGenerator();
  });

  it('should generate a random name', async () => {
    const nextName = nameGenerator.generateNext();
    console.log(nextName);
    expect(nextName).toBeTruthy();
  });

  it('should generate three different random names', async () => {
    const nextName = nameGenerator.generateNext();
    console.log(nextName);
    expect(nextName).toBeTruthy();

    nameGenerator.init([nextName]);
    const nextName2 = nameGenerator.generateNext();
    console.log(nextName2);
    expect(nextName2).toBeTruthy();

    nameGenerator.init([nextName, nextName2]);
    const nextName3 = nameGenerator.generateNext();
    console.log(nextName3);
    expect(nextName3).toBeTruthy();

    expect(nextName).not.toEqual(nextName2);
    expect(nextName).not.toEqual(nextName3);
    expect(nextName2).not.toEqual(nextName3);
  });
});
