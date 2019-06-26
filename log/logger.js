// 挖个坑 之后来填吧. 输出日志到文件

import fs from 'fs'

// const logFile = fs.createWriteStream('debug.log', { flags: 'a' })

export default class Logger {

  // 这里需要判空
  constructor(filePath) {
    this.file = fs.createWriteStream('filePath', { flags: 'a' })
  }
  
  log(obj) {
    console.log(obj)
  }

  dir(obj) {
    console.dir(obj)
  }
}

// 对于互联网的思考：
// 我对自己的定位还是一个软件服务商 -> 传统软件到互联软件
// 本质还是需要创造价值
// 新时代的手艺人