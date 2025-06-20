class ThreadRepository {
    async create(userId, newThread) {
      throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async isAvailable(thread) {
      throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  
    async getDetail(thread) {
      throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
  }
  
  module.exports = ThreadRepository;
  