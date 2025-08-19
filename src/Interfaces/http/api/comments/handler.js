const CreateCommentUseCase = require('../../../../Applications/use_case/CreateCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
class CommentHandler {
    constructor(container) {
        this._container = container;
    }

    async postCommentHandler(request, h) {
        const { id: authenticatedUserId } = request.auth.credentials;
        const { threadId } = request.params;
        const createCommentUseCase = this._container.getInstance(CreateCommentUseCase.name);
        const createdComment = await createCommentUseCase.execute(authenticatedUserId, threadId, request.payload);

        const response = h.response({
            status: 'success',
            data: {
                addedComment: createdComment,
            },
        });
        response.code(201);
        return response;
    }

    async deleteCommentHandler(request, h) {
        const { id: authenticatedUserId } = request.auth.credentials;
        const { threadId, commentId } = request.params;
        const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
        await deleteCommentUseCase.execute(authenticatedUserId, threadId, commentId);

        const response = h.response({
            status: 'success',
            message: 'Komentar berhasil dihapus',
        });
        response.code(200);
        return response;
    }
}

module.exports = CommentHandler;