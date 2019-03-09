import { HLTV } from 'hltv'
import MatchService from './match_service'

export default class LiveMatchService extends MatchService {

  fetchScoreBoard() {
    HLTV.getMatch({ id: this.steam_id}).
      then(res => console.dir(res, {depth: null})).
      catch(err => console.log(err));
  }

}

LiveMatchService.run = function(match) {
  console.log(global.lives);
  var service = new LiveMatchService(match.id)
  service.fetchScoreBoard()

}

// 这里用来处理所有 进行中 Match
