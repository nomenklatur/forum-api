const CreateThreadUseCase = require('../../../../Applications/use_case/CreateThreadUseCase');

class ThreadsHandler {
    constructor(container) {
        this._container = container;
    }

    async postThreadHandler(request, h) {
        const { id: authenticatedUserId } = request.auth.credentials;
        const createThreadUseCase = this._container.getInstance(CreateThreadUseCase.name);
        const createdThread = await createThreadUseCase.execute(authenticatedUserId, request.payload);

        const response = h.response({
            status: 'success',
            data: {
                addedThread: createdThread,
            },
        });
        response.code(201);
        return response;
    }
}

module.exports = ThreadsHandler;