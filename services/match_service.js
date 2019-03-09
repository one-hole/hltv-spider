import { HLTV } from 'hltv'

export default class MatchService {
  constructor(steam_id) {
    this.steam_id = steam_id;
  }

  // 获取某场具体比赛的信息 & 赛前 & 赛中 & 赛后 均可使用
  // 这里面涵盖有 队伍 & 队员 & 地图
  fetchMatchDetail() {
    HLTV.getMatch({ id: this.steam_id}).
      then(res => console.dir(res, {depth: null})).
      catch(err => console.log(err));
  }
}

// 这里用来处理所有 进行中 Match
