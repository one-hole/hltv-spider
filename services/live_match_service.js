import { HLTV } from 'hltv'
import MatchService from './match_service'

export default class LiveMatchService extends MatchService {

  fetchScoreBoard() {
    HLTV.connectToScorebot({id: this.steam_id, onScoreboardUpdate: (data) => {
      console.log("-----------------------------------------");
      console.log("-----------------------------------------");
      console.log("-----------------------------------------");
      console.log("-----------------------------------------");
      console.log("-----------------------------------------");
      console.log("-----------------------------------------");
      console.log("");
      console.dir(data, { depth: null });
    }, onLogUpdate: (data) => {
      // console.log(data);
    }, onFullLogUpdate: (data) => {

    }})
  }
}

LiveMatchService.run = (match) => {
  var service = new LiveMatchService(match.id)
  // service.fetchMatchDetail();
  service.fetchScoreBoard();
}

// 这里用来处理所有 进行中 Match
