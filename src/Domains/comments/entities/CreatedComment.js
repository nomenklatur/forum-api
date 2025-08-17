class CreatedComment {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id, content, owner } = payload;

        this.id = id;
        this.content = content;
        this.owner = owner;
    }

    _verifyPayload(payload) {
        const { id, content, owner } = payload;

        if (!id || !content || !owner) {
            throw new Error('CREATED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof id !== 'string' || typeof content !== 'string' || typeof owner !== 'string') {
            throw new Error('CREATED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (content.length > 1000) {
            throw new Error('CREATED_COMMENT.CHARACTERS_LIMIT_EXCEEDED');
        }
    }
}

module.exports = CreatedComment;