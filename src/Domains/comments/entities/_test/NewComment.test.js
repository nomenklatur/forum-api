const NewComment = require('../NewComment');
const { NEW_COMMENT_PAYLOAD } = require('./payload');

describe('a NewComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    expect(() => new NewComment(NEW_COMMENT_PAYLOAD.WITH_MISSING_PROPERTY)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    expect(() => new NewComment(NEW_COMMENT_PAYLOAD.WITH_INVALID_DATA_TYPE)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create new NewComment entities correctly', () => {
    const { content } = new NewComment(NEW_COMMENT_PAYLOAD.WITH_VALID_DATA);
    expect(content).toEqual(NEW_COMMENT_PAYLOAD.WITH_VALID_DATA.content);
  });
});