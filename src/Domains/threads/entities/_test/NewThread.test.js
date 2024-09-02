const NewThread = require('../NewThread');
const { NEW_THREAD_PAYLOAD: PAYLOAD } = require('./payload');

describe('a NewThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
      expect(() => new NewThread(PAYLOAD.WITH_MISSING_PROPERTY)).toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });
  
    it('should throw error when payload did not meet data type specification', () => {
      expect(() => new NewThread(PAYLOAD.WITH_INVALID_DATA_TYPE)).toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
  
    it('should create new thread object correctly', () => {
  
      const { title, body, owner } = new NewThread(PAYLOAD.WITH_VALID_DATA);
  
      expect(title).toEqual(PAYLOAD.WITH_VALID_DATA.title);
      expect(body).toEqual(PAYLOAD.WITH_VALID_DATA.body);
      expect(owner).toEqual(PAYLOAD.WITH_VALID_DATA.owner);
    });
  });