const CreateCommentUseCase = require('../../../../Applications/use_case/CreateCommentUseCase');
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
}

module.exports = CommentHandler;