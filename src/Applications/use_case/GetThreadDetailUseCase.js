class GetThreadDetailUseCase {
    constructor({ threadRepository }) {
        this._threadRepository = threadRepository;
    }

    async execute(threadId) {
        await this._threadRepository.isAvailable(threadId);
        const result = await this._threadRepository.getDetail(threadId);
        return {
            id: result[0].thread_id,
            title: result[0].title,
            body: result[0].body,
            date: result[0].date,
            username: result[0].thread_owner,
            comments: result.map(comment => ({
                id: comment.comment_id,
                username: comment.comment_owner,
                date: comment.comment_date,
                content: comment.is_delete ? '**komentar telah dihapus**' : comment.content
            })).filter(comment => comment.id !== null)
        }
    }
}

module.exports = GetThreadDetailUseCase;