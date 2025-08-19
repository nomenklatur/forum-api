const routes = (handler) => ([
    {
        path: '/threads/{threadId}/comments',
        method: 'POST',
        handler: (request, h) => handler.postCommentHandler(request, h),
        options: {
            auth: 'jwt',
        }
    }, 
    {
        path: '/threads/{threadId}/comments/{commentId}',
        method: 'DELETE',
        handler: (request, h) => handler.deleteCommentHandler(request, h),
        options: {
            auth: 'jwt',
        }
    }
]);

module.exports = routes;