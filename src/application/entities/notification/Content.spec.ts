import { Content } from './Content';

describe('NotificationContent', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('you got mail');

    expect(content).toBeTruthy();
  });

  it("shouldn't be able to create a notification content with less than 5 characters", () => {
    expect(() => new Content('123')).toThrow();
  });

  it("shouldn't be able to create a notification content with more than 240 characters", () => {
    expect(() => new Content('1'.repeat(241))).toThrow();
  });
});
