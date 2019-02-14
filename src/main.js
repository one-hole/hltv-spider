import { HLTV } from 'hltv'
import { RedisClient } from '../middleware/redis'

const aysncFetchMatches = async function() {
  await HLTV.getMatches().then(function(res) {
    if (Array.isArray(res)) {
      console.log('is Array');
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
  console.log(liveMatches)
}

// ------------------------------------ 这里处理所有的比赛 ------------------------------------
const processMatch = (match) => {
  RedisClient.h_set(match)
}

// setInterval(aysncFetchMatches, 5000)
aysncFetchMatches()
// RedisClient.quit()
