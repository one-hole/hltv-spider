import { HLTV } from 'hltv'
import { RedisClient } from '../middleware/redis'
import LiveMatchService from '../services/live_match_service'
import Logger from '../log/logger'

let current_lives = [];
let previous_lives = [];


function contains(arr, obj) {
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}  

const aysncFetchMatches = async function() {
  await HLTV.getMatches().then(function(res) {
    if (Array.isArray(res)) {
      processLiveMatches(filterLiveMatches(res));
    }
  })

  // console.log("------------------")
}

// ------------------------------------ 这里需要拿出 Live 的比赛 ------------------------------------
// 这里同时需要重新给 current_lives 数组赋值
function filterLiveMatches(matches) {
  var liveMatches = new Array();

  previous_lives = current_lives;
  current_lives = [];

  // console.log(previous_lives);  

  for(var index in matches) {
    if (isLive(matches[index])) {
      liveMatches.push(matches[index]);
      current_lives.push(matches[index].id);
    }
    processMatch(matches[index])
  }

  // console.log(current_lives);
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
      // 如果 ID 在 previous_lives 就不处理
      if (contains(previous_lives, liveMatches[index].id)){

      } else {
        LiveMatchService.run(liveMatches[index]);
      }
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
setInterval(aysncFetchMatches, 15000)
