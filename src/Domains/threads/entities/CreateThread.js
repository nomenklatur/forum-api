class CreateThread {
    constructor(payload) {
        this._verifyPayload(payload);

        const { title, body, owner } = payload;
        
        this.title = title;
        this.body = body;
        this.owner = owner;
    }

    _verifyPayload(payload) {
        const { title, body, owner } = payload;
        
        if (!title || !body || !owner) {
            throw new Error('CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
          }
      
          if (typeof title !== 'string' || typeof body !== 'string' || typeof owner !== 'string') {
            throw new Error('CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
          }
      
          if (title.length > 250) {
            throw new Error('CREATE_THREAD.CHARACTERS_LIMIT_EXCEEDED');
          }
    }
}

module.exports = CreateThread;