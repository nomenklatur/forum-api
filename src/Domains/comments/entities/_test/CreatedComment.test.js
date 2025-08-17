const CreatedComment = require('../CreatedComment');
const { CREATED_COMMENT_PAYLOAD } = require('./payload');

describe('a CreatedComment entities', () => {
        it('should throw error when payload did not contain needed property', () => {
            expect(() => new CreatedComment(CREATED_COMMENT_PAYLOAD.WITH_MISSING_PROPERTY)).toThrowError('CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
        });
    
        it('should throw error when payload did not meet data type specification', () => {
            expect(() => new CreatedComment(CREATED_COMMENT_PAYLOAD.WITH_INVALID_DATA_TYPE)).toThrowError('CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        });
    
        it('should create new CreatedComment entities correctly', () => {
            const { id, content, owner } = new CreatedComment(CREATED_COMMENT_PAYLOAD.WITH_VALID_DATA);
            expect(id).toEqual(CREATED_COMMENT_PAYLOAD.WITH_VALID_DATA.id);
            expect(content).toEqual(CREATED_COMMENT_PAYLOAD.WITH_VALID_DATA.content);
            expect(owner).toEqual(CREATED_COMMENT_PAYLOAD.WITH_VALID_DATA.owner);
        });
});