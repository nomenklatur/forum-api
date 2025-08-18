const NewComment = require('../../Domains/comments/entities/NewComment');

class CreateCommentUseCase {
    constructor({ commentRepository, threadRepository}) {
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    async execute(userId, threadId, payload) {
        await this._threadRepository.isAvailable(threadId);
        const newComment = new NewComment(payload);
        return this._commentRepository.create(userId, threadId, newComment);
    }
}

module.exports = CreateCommentUseCase;