"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sword, Crown, Trophy, Target, Users, Zap, Star } from "lucide-react"

export function ActivitySidebar() {
  // Mock real-time bidding data
  const recentBids = [
    { id: 1, user: "龍騎士小王", item: "+5 附魔藍牙耳機", bid: "NT$3,200", time: "2秒前", avatar: "🐉" },
    { id: 2, user: "魔法師莉莉", item: "史詩級太陽眼鏡", bid: "NT$1,800", time: "15秒前", avatar: "🧙‍♀️" },
    { id: 3, user: "聖騎士阿明", item: "傳說陶瓷馬克杯", bid: "NT$650", time: "1分鐘前", avatar: "⚔️" },
    { id: 4, user: "刺客小美", item: "稀有羊毛圍巾", bid: "NT$2,100", time: "2分鐘前", avatar: "🗡️" },
  ]

  // Mock guild rankings
  const guildRankings = [
    { rank: 1, name: "暗影公會", points: 15420, icon: "🖤", change: "+2" },
    { rank: 2, name: "光明騎士團", points: 14850, icon: "⚡", change: "-1" },
    { rank: 3, name: "龍炎戰士", points: 13920, icon: "🔥", change: "+1" },
    { rank: 4, name: "魔法學院", points: 12680, icon: "🔮", change: "-2" },
  ]

  // Mock daily quests
  const dailyQuests = [
    { id: 1, title: "參與3次競標", progress: 2, max: 3, reward: "100 經驗值", completed: false },
    { id: 2, title: "獲得1件稀有物品", progress: 0, max: 1, reward: "透視鏡 x1", completed: false },
    { id: 3, title: "登錄遊戲", progress: 1, max: 1, reward: "50 金幣", completed: true },
  ]

  return (
    <div className="space-y-6">
      {/* Real-time Bidding Activity */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-yellow-400" />
            實時競標動態
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentBids.map((bid) => (
            <div key={bid.id} className="flex items-center space-x-3 p-2 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
              <div className="text-lg">{bid.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white truncate">{bid.user}</span>
                  <Badge variant="outline" className="text-xs border-yellow-400 text-yellow-400">
                    <Sword className="h-3 w-3 mr-1" />
                    出價
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 truncate">{bid.item}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm font-bold text-green-400">{bid.bid}</span>
                  <span className="text-xs text-gray-500">{bid.time}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center pt-2">
            <Badge variant="secondary" className="text-xs bg-slate-700 text-gray-400">
              每5秒更新
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Guild Rankings */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <Crown className="h-5 w-5 text-yellow-400" />
            公會排行
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {guildRankings.map((guild) => (
            <div key={guild.rank} className="flex items-center space-x-3 p-2 rounded-lg bg-slate-700/30">
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={guild.rank === 1 ? "default" : "secondary"}
                  className={`w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs
                    ${guild.rank === 1 ? 'bg-yellow-500 text-black' : 
                      guild.rank === 2 ? 'bg-gray-400 text-black' : 
                      guild.rank === 3 ? 'bg-orange-600 text-white' : 'bg-slate-600 text-white'}`}
                >
                  {guild.rank}
                </Badge>
                <span className="text-lg">{guild.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{guild.name}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-400">{guild.points.toLocaleString()}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs h-4 px-1 ${
                        guild.change.startsWith('+') ? 'border-green-400 text-green-400' : 'border-red-400 text-red-400'
                      }`}
                    >
                      {guild.change}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Daily Quests */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-yellow-400" />
            每日任務
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dailyQuests.map((quest) => (
            <div key={quest.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${quest.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                  {quest.title}
                </span>
                {quest.completed && (
                  <Badge className="bg-green-600 text-white text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    完成
                  </Badge>
                )}
              </div>
              
              {!quest.completed && (
                <div className="space-y-1">
                  <Progress 
                    value={(quest.progress / quest.max) * 100} 
                    className="h-2 bg-slate-700"
                  />
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{quest.progress}/{quest.max}</span>
                    <span className="text-yellow-400">獎勵: {quest.reward}</span>
                  </div>
                </div>
              )}
              
              {quest.completed && (
                <div className="text-xs text-green-400">
                  ✨ 獎勵已獲得: {quest.reward}
                </div>
              )}
            </div>
          ))}
          
          <div className="pt-2 border-t border-slate-700">
            <div className="text-center">
              <Badge variant="outline" className="text-xs border-blue-400 text-blue-400">
                <Trophy className="h-3 w-3 mr-1" />
                今日進度: 33%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}