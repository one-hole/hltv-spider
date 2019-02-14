import { HLTV } from 'hltv'
// import * as redis from 'redis'

// const client = redis.createClient()
//
// HLTV.getMatches().then(function(res) {
//   console.log(res)
// })
//
// client.quit()

const aysncFetchMatches = async function() {
  await HLTV.getMatches().then(function(res) {
    if (Array.isArray(res)) {
      var tmp = filterLiveMatches(res)
      console.log(tmp.length);
    }
  })

  console.log("------------------");
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
function processLiveMatches(liveMatches) {

}

// ------------------------------------ 这里处理所有的比赛 ------------------------------------
function processMatches(matches) {

}

setInterval(aysncFetchMatches, 2000)
