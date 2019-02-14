import { HLTV } from 'hltv'
import { Config } from '../config/config'
import redis from 'redis'

const client = redis.createClient({
  host: Config.Redis['Host'],
  port: Config.Redis['Port'],
  db: Config.Redis['Db']
})

const aysncFetchMatches = async function() {
  await HLTV.getMatches().then(function(res) {
    if (Array.isArray(res)) {
      processLiveMatches(filterLiveMatches(res))
      processMatches(res)
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
const processMatches = (matches) => {
  console.log(matches.length)
}

// setInterval(aysncFetchMatches, 5000)
console.log(Config.Redis)
client.quit()