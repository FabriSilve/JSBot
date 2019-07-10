import baseFunction from '../src/base';

describe('Base test', () => {
  test('Sum', () => {
    const result = baseFunction(2, 2);
    expect(result).toEqual(4);
  });
});
