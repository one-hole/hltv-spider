1. 抓取赛事列表
2. 过滤正在进行中的比赛
3. 对正在进行中的比赛进行记分板抓取同时写入 Redis Pub/Sub
4. WebSocket 消费 Pub/Sub | 业务逻辑处理 Pub/Sub - 比赛细节、队员数据
