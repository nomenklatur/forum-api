const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const CreatedComment = require("../../../../Domains/comments/entities/CreatedComment");
const AuthorizationError = require("../../../../Commons/exceptions/AuthorizationError");
const NotFoundError = require("../../../../Commons/exceptions/NotFoundError");

class CommentRepositoryPostgres extends CommentRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async create(userId, threadId, newComment) {
        const commentId = `comment-${this._idGenerator()}`;
        const { content } = newComment;
        const date = new Date().toISOString();

        const query = {
            text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner',
            values: [commentId, content, date, threadId, userId],
        };

        const queryResult = await this._pool.query(query);
        return new CreatedComment(queryResult.rows[0]);
    }

    async isAvailable(commentId) {
        const query = {
            text: 'SELECT id FROM comments WHERE id = $1 AND is_delete = false',
            values: [commentId],
        };

        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new NotFoundError('comment tidak ditemukan');
        }


    }

    async remove(commentId, userId) {
        const getCommentOwnerQuery = {
            text: 'SELECT owner FROM comments WHERE id = $1',
            values: [commentId],
        };
        const commentOwnerResult = await this._pool.query(getCommentOwnerQuery);
        if (!commentOwnerResult.rowCount) {
            throw new NotFoundError('comment tidak ditemukan');
        }
        if (commentOwnerResult.rows[0].owner !== userId) {
            throw new AuthorizationError('anda tidak punya akses untuk menghapus komentar ini');
        }

        const query = {
            text: 'UPDATE comments SET is_delete = true WHERE id = $1',
            values: [commentId],
        };

        await this._pool.query(query);
    }
}

module.exports = CommentRepositoryPostgres;