const CREATED_THREAD_PAYLOAD = {
    WITH_MISSING_PROPERTY: {
        title: 'Thread title',
    },
    WITH_INVALID_DATA_TYPE: {
        id: 1,
        title: true,
        owner: true
    },
    WITH_EXCEEDED_TITLE: {
        id: 'thread-123',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Consequat interdum varius sit amet mattis vulputate enim nulla. Sit amet aliquam id diam maecenas. Ut etiam sit amet nisl purus. Suscipit adipiscing bibendum est ultricies integer quis.',
        owner: 'user-123',
    },
    WITH_VALID_DATA: {
        id: 'thread-123',
        title: 'Thread title',
        owner: 'user-123',
    }
}

const NEW_THREAD_PAYLOAD = {
    WITH_MISSING_PROPERTY: CREATED_THREAD_PAYLOAD.WITH_MISSING_PROPERTY,
    WITH_INVALID_DATA_TYPE: {
        title: true,
        body: 1
    },
    WITH_VALID_DATA: {
        id: 'thread-123',
        title: 'Thread title',
        body: 'user-123'
    },
}

module.exports = { CREATED_THREAD_PAYLOAD, NEW_THREAD_PAYLOAD};