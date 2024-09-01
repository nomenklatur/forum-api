const CreateThread = require('../CreateThread');
const PAYLOAD = require('./payload');

describe('a CreateThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    expect(() => new CreateThread(PAYLOAD.WITH_MISSING_PROPERTY)).toThrowError('CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    expect(() => new CreateThread(PAYLOAD.WITH_INVALID_DATA_TYPE)).toThrowError('CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when title contains more than 250 character', () => {
    expect(() => new CreateThread(PAYLOAD.WITH_EXCEEDED_TITLE)).toThrowError('CREATE_THREAD.CHARACTERS_LIMIT_EXCEEDED');
  });

  it('should create new CreateThread entities correctly', () => {
    const { title, body, owner } = new CreateThread(PAYLOAD.WITH_VALID_DATA);
    expect(title).toEqual(PAYLOAD.WITH_VALID_DATA.title);
    expect(body).toEqual(PAYLOAD.WITH_VALID_DATA.body);
    expect(owner).toEqual(PAYLOAD.WITH_VALID_DATA.owner);
  });
});
