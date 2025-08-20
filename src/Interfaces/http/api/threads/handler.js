const CreateThreadUseCase = require('../../../../Applications/use_case/CreateThreadUseCase');
const GetThreadDetailUseCase = require('../../../../Applications/use_case/GetThreadDetailUseCase');

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

    async getThreadDetailHandler(request, h) {
        const { threadId } = request.params;
        const getThreadDetailUseCase = this._container.getInstance(GetThreadDetailUseCase.name);
        const threadDetail = await getThreadDetailUseCase.execute(threadId);

        const response = h.response({
            status: 'success',
            data: {
                thread: threadDetail,
            },
        });
        response.code(200);
        return response;
    }
}

module.exports = ThreadsHandler;