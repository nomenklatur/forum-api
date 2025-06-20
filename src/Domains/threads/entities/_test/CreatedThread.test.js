const CreatedThread = require('../CreatedThread');
const { CREATED_THREAD_PAYLOAD: PAYLOAD} = require('./payload');

describe('a CreatedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    expect(() => new CreatedThread(PAYLOAD.WITH_MISSING_PROPERTY)).toThrowError('CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    expect(() => new CreatedThread(PAYLOAD.WITH_INVALID_DATA_TYPE)).toThrowError('CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when title contains more than 250 character', () => {
    expect(() => new CreatedThread(PAYLOAD.WITH_EXCEEDED_TITLE)).toThrowError('CREATED_THREAD.CHARACTERS_LIMIT_EXCEEDED');
  });

  it('should create new CreatedThread entities correctly', () => {
    const { title, body, owner } = new CreatedThread(PAYLOAD.WITH_VALID_DATA);
    expect(title).toEqual(PAYLOAD.WITH_VALID_DATA.title);
    expect(body).toEqual(PAYLOAD.WITH_VALID_DATA.body);
    expect(owner).toEqual(PAYLOAD.WITH_VALID_DATA.owner);
  });
});
