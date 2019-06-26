import { HLTV } from 'hltv'
import { RedisClient } from '../middleware/redis'
import MatchService from './match_service'

// 前端其实只需要直接连接 HLTV 就好了
// 服务端我们进行二次转发即可

export default class LiveMatchService extends MatchService {

  fetchScoreBoard() {
    HLTV.connectToScorebot({id: this.steam_id, onScoreboardUpdate: (data) => {

      var output = {
        id: this.steam_id,
        data: data
      }
      RedisClient.socket_pub(output);

    }, onLogUpdate: (data) => {
      var output = {
        id: this.steam_id,
        logs: data
      }

      RedisClient.socket_pub(output);
    }, onFullLogUpdate: (data) => {

    }})
  }
}

// 已经存在的连接我们不需要二次重新连接
LiveMatchService.run = (match) => {
  // console.log("Live");
  var service = new LiveMatchService(match.id)
  service.fetchScoreBoard();
}

// 这里用来处理所有 进行中 Match
