import { HLTV } from 'hltv'
import { RedisClient } from '../middleware/redis'
import LiveMatchService from '../services/live_match_service'

global.lives = {

}

const aysncFetchMatches = async function() {
  await HLTV.getMatches().then(function(res) {
    if (Array.isArray(res)) {
      processLiveMatches(filterLiveMatches(res))
    }
  })

  console.log("------------------")
}

// ------------------------------------ 这里需要拿出 Live 的比赛 ------------------------------------
function filterLiveMatches(matches) {
  var liveMatches = new Array()
  for(var index in matches) {
    if (isLive(matches[index])) {
      liveMatches.push(matches[index])
    }
    processMatch(matches[index])
  }
  return liveMatches
}

function isLive(match) {
  if (match['live'] == true) {
    return true
  }
  return false
}

// ------------------------------------ 这里处理 Live 的比赛 ------------------------------------
const processLiveMatches = (liveMatches) => {
  if (Array.isArray(liveMatches)) {
    for(var index in liveMatches) {
      LiveMatchService.run(liveMatches[index]);
    }
  }
}

// ------------------------------------ 这里处理所有的比赛 ------------------------------------
const processMatch = (match) => {
  RedisClient.pub(match);
}

/*
  每间隔 15 秒请求一次 HLTV 的赛程
*/

// setInterval(aysncFetchMatches, 15000)


LiveMatchService.run({
  id: 2333783
})
