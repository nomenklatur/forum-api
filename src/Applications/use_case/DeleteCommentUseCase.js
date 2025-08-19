class DeleteCommentUseCase {
    constructor({ commentRepository, threadRepository }) {
        this._commentRepository = commentRepository;
        this._threadRepository = threadRepository;
    }

    async execute(userId, threadId, commentId) {
        await this._threadRepository.isAvailable(threadId);
        return this._commentRepository.remove(commentId, userId)
    }
}

module.exports = DeleteCommentUseCase;