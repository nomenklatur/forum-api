const CREATED_COMMENT_PAYLOAD = {
    WITH_MISSING_PROPERTY: {
    },
    WITH_INVALID_DATA_TYPE: {
        id: 1,
        content: "Invalid content",
        owner: true
    },
    WITH_VALID_DATA: {
        id: 'comment-123',
        content: 'Comment content',
        owner: 'user-123',
    }
}

const NEW_COMMENT_PAYLOAD = {
    WITH_MISSING_PROPERTY: CREATED_COMMENT_PAYLOAD.WITH_MISSING_PROPERTY,
    WITH_INVALID_DATA_TYPE: {
        content: true,
    },
    WITH_VALID_DATA: {
        content: 'New comment content',
    },
}

module.exports = { CREATED_COMMENT_PAYLOAD, NEW_COMMENT_PAYLOAD};