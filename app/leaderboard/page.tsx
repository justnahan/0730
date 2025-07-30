import { Metadata } from 'next'
import { RPGNavigation } from "@/components/rpg-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, Trophy, Medal, Star, Swords } from "lucide-react"

export const metadata: Metadata = {
  title: '排行榜 | 拍賣競技場',
  description: '查看頂尖勇者的榮耀排名',
}

export default function LeaderboardPage() {
  const topPlayers = [
    { 
      rank: 1, 
      name: "傳說勇者阿龍", 
      level: 89, 
      experience: 245680, 
      wins: 127, 
      avatar: "🐉",
      title: "拍賣霸主"
    },
    { 
      rank: 2, 
      name: "魔法大師莉莉", 
      level: 76, 
      experience: 189340, 
      wins: 98, 
      avatar: "🧙‍♀️",
      title: "智慧之星"
    },
    { 
      rank: 3, 
      name: "聖光騎士", 
      level: 72, 
      experience: 167890, 
      wins: 89, 
      avatar: "⚔️",
      title: "正義守護者"
    },
    { 
      rank: 4, 
      name: "暗影刺客", 
      level: 68, 
      experience: 152340, 
      wins: 76, 
      avatar: "🗡️",
      title: "神秘獵手"
    },
    { 
      rank: 5, 
      name: "元素法師", 
      level: 65, 
      experience: 143670, 
      wins: 71, 
      avatar: "🔮",
      title: "元素操控者"
    },
  ]

  const guildRankings = [
    { rank: 1, name: "暗影公會", members: 23, points: 15420, icon: "🖤" },
    { rank: 2, name: "光明騎士團", members: 19, points: 14850, icon: "⚡" },
    { rank: 3, name: "龍炎戰士", members: 17, points: 13920, icon: "🔥" },
    { rank: 4, name: "魔法學院", members: 21, points: 12680, icon: "🔮" },
  ]

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-6 w-6 text-yellow-400" />
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-300" />
    if (rank === 3) return <Trophy className="h-6 w-6 text-orange-600" />
    return <Star className="h-5 w-5 text-gray-500" />
  }

  const getRankBg = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500"
    if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400"
    if (rank === 3) return "bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-600"
    return "bg-slate-800/50 border-slate-700"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <RPGNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              榮耀排行榜
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            見證最強勇者的傳奇成就！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player Rankings */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  勇者排行榜
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topPlayers.map((player) => (
                  <div 
                    key={player.rank} 
                    className={`flex items-center space-x-4 p-4 rounded-lg border ${getRankBg(player.rank)} transition-all hover:scale-102`}
                  >
                    <div className="flex items-center space-x-3">
                      {getRankIcon(player.rank)}
                      <div className="text-2xl">{player.avatar}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-white">{player.name}</h3>
                        <Badge variant="outline" className="border-purple-400 text-purple-400 text-xs">
                          {player.title}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>等級 {player.level}</span>
                        <span>經驗值 {player.experience.toLocaleString()}</span>
                        <span className="flex items-center gap-1">
                          <Swords className="h-3 w-3" />
                          {player.wins} 勝
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Guild Rankings */}
          <div>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Crown className="h-6 w-6 text-yellow-400" />
                  公會排行榜
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {guildRankings.map((guild) => (
                  <div 
                    key={guild.rank} 
                    className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                  >
                    <Badge 
                      variant={guild.rank === 1 ? "default" : "secondary"}
                      className={`w-8 h-8 rounded-full p-0 flex items-center justify-center text-sm
                        ${guild.rank === 1 ? 'bg-yellow-500 text-black' : 
                          guild.rank === 2 ? 'bg-gray-400 text-black' : 
                          guild.rank === 3 ? 'bg-orange-600 text-white' : 'bg-slate-600 text-white'}`}
                    >
                      {guild.rank}
                    </Badge>
                    <div className="text-xl">{guild.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm">{guild.name}</h4>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{guild.members} 成員</span>
                        <span>{guild.points.toLocaleString()} 積分</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-slate-800/50 border-slate-700 mt-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">統計數據</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">總註冊勇者</span>
                  <span className="font-bold text-white">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">活躍公會</span>
                  <span className="font-bold text-white">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">總競標次數</span>
                  <span className="font-bold text-white">8,976</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}