import redis from 'redis';
import { Config } from '../config/config';

export const RedisClient = redis.createClient({
  host: Config.Redis['Host'],
  port: Config.Redis['Port'],
  db: Config.Redis['Db']
})

// ------------------------------------ 下面封装 Redis 的基本操作 ------------------------------------

// TODO 可以优化的地方 hmset
RedisClient.h_set = function(match) {
  RedisClient.hset('hltv-matches', match['id'], JSON.stringify(match))
}

RedisClient.pub = match => {
  RedisClient.publish('hltv-matches-channel', JSON.stringify(match))
}

RedisClient.live_pub = match => {
  RedisClient.publish('hltv-live-matches-channel', JSON.stringify(match))
}

RedisClient.socket_pub = data => {
  RedisClient.publish('aiesports-csgo-websocket-to-back', JSON.stringify(data))
}
