const routes = (handler) => ([
    {
        path: '/threads',
        method: 'POST',
        handler: (request, h) => handler.postThreadHandler(request, h),
        options: {
            auth: 'jwt',
        }
    },
    {
        path: '/threads/{threadId}',
        method: 'GET',
        handler: (request, h) => handler.getThreadDetailHandler(request, h),
    }
]);

module.exports = routes;