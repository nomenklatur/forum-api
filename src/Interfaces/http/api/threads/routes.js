const routes = (handler) => ([
    {
        path: '/threads',
        method: 'POST',
        handler: (request, h) => handler.postThreadHandler(request, h),
        options: {
            auth: 'jwt',
        }
    }
]);

module.exports = routes;