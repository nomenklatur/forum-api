class CreatedThread {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id, title, owner } = payload;
        
        this.id = id;
        this.title = title;
        this.owner = owner;
    }

    _verifyPayload(payload) {
        const { id, title, owner } = payload;
        
        if (!title || !id || !owner) {
            throw new Error('CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
          }
      
          if (typeof title !== 'string' || typeof id !== 'string' || typeof owner !== 'string') {
            throw new Error('CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
          }
      
          if (title.length > 250) {
            throw new Error('CREATED_THREAD.CHARACTERS_LIMIT_EXCEEDED');
          }
    }
}

module.exports = CreatedThread;