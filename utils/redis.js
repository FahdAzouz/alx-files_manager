import { builtinModules } from 'module';
import { createClient } from 'redis';
import { promisify } from 'util';
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server: $(error)`);
    });
  }
  // Check if Redis is alive
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }


  // get a value from Redis
  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    const value = await redisGet(key);
    return value;
  }

  // set a value in Redis
  async set(key, value, duration) {
    const redisSet = promisify(this.client.set).bind(this.client);
    await redisSet(key, value);
    this.client.expire(key, duration);
  }

  // delete a value from Redis
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
