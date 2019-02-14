import redis from 'redis'
import { Config } from '../config/config'

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