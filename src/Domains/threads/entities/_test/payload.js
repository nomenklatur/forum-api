const CREATE_THREAD_PAYLOAD = {
    WITH_MISSING_PROPERTY: {
        title: 'Thread title',
        owner: 'user-123'
    },
    WITH_INVALID_DATA_TYPE: {
        title: true,
        body: true,
        owner: true
    },
    WITH_EXCEEDED_TITLE: {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Consequat interdum varius sit amet mattis vulputate enim nulla. Sit amet aliquam id diam maecenas. Ut etiam sit amet nisl purus. Suscipit adipiscing bibendum est ultricies integer quis.',
        body: 'Dicoding Indonesia',
        owner: 'user-123',
    },
    WITH_VALID_DATA: {
        title: 'Thread title',
        body: 'Dicoding Indonesia',
        owner: 'user-123',
    }
}

const NEW_THREAD_PAYLOAD = {
    WITH_MISSING_PROPERTY: CREATE_THREAD_PAYLOAD.WITH_MISSING_PROPERTY,
    WITH_INVALID_DATA_TYPE: {
        id: 1,
        title: true,
        owner: 1
    },
    WITH_VALID_DATA: {
        id: 'thread-123',
        title: 'Thread title',
        owner: 'user-123'
    },
}

module.exports = { CREATE_THREAD_PAYLOAD, NEW_THREAD_PAYLOAD};