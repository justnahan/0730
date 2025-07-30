import { Metadata } from 'next'
import { RPGNavigation } from "@/components/rpg-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Trophy, 
  Package, 
  History, 
  Star, 
  Coins,
  Sword,
  Shield,
  Zap,
  Eye,
  Settings,
  ArrowRight,
  Brain,
  Clock
} from "lucide-react"

export const metadata: Metadata = {
  title: '我的冒險 | 拍賣競技場',
  description: '查看你的冒險歷程和個人成就',
}

export default function AdventurePage() {
  // Mock user data
  const userData = {
    username: "勇者小明",
    level: 15,
    experience: 750,
    maxExperience: 1000,
    coins: 2350,
    gems: 15,
    skillPoints: 8,
    avatar: "/placeholder-avatar.jpg",
    title: "新手冒險者",
    joinDate: "2024-01-15",
    totalBids: 23,
    wonAuctions: 8,
    winRate: 34.8,
    attributes: {
      attack: 45,
      defense: 38,
      agility: 52,
      luck: 41
    }
  }

  const achievements = [
    { id: 1, name: "初次競標", description: "完成第一次競標", icon: "🎯", completed: true, progress: 1, maxProgress: 1 },
    { id: 2, name: "連勝戰士", description: "連續贏得3場競標", icon: "🔥", completed: true, progress: 3, maxProgress: 3 },
    { id: 3, name: "寶物收集家", description: "獲得10件不同物品", icon: "💎", completed: false, progress: 7, maxProgress: 10 },
    { id: 4, name: "金幣大師", description: "累積10000金幣", icon: "💰", completed: false, progress: 2350, maxProgress: 10000 },
    { id: 5, name: "道具專家", description: "使用道具50次", icon: "⚡", completed: false, progress: 23, maxProgress: 50 },
    { id: 6, name: "技能大師", description: "學習15個技能", icon: "🧠", completed: false, progress: 6, maxProgress: 15 },
  ]

  const recentActivity = [
    { id: 1, type: "win", item: "+5 附魔藍牙耳機", price: "NT$3,200", time: "2小時前" },
    { id: 2, type: "bid", item: "史詩級太陽眼鏡", price: "NT$1,800", time: "4小時前" },
    { id: 3, type: "win", item: "傳說陶瓷馬克杯", price: "NT$650", time: "1天前" },
    { id: 4, type: "bid", item: "稀有羊毛圍巾", price: "NT$2,100", time: "2天前" },
  ]

  const inventory = [
    { id: 1, name: "狙擊手套", count: 2, icon: "🎯", rarity: "史詩", type: "attack", cooldown: 0 },
    { id: 2, name: "守護之盾", count: 4, icon: "🛡️", rarity: "稀有", type: "defense", cooldown: 120 },
    { id: 3, name: "時間沙漏", count: 1, icon: "⏳", rarity: "傳說", type: "support", cooldown: 0 },
    { id: 4, name: "透視水晶", count: 6, icon: "🔮", rarity: "稀有", type: "support", cooldown: 45 },
    { id: 5, name: "幸運硬幣", count: 1, icon: "🪙", rarity: "神話", type: "special", cooldown: 86400 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <RPGNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              我的冒險歷程
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            追蹤你在拍賣競技場的成長軌跡
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-yellow-500">
                  <AvatarImage src={userData.avatar} alt={userData.username} />
                  <AvatarFallback className="bg-slate-600 text-white text-2xl">
                    {userData.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-white text-xl">{userData.username}</CardTitle>
                <Badge variant="outline" className="border-purple-400 text-purple-400">
                  {userData.title}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Level Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">等級 {userData.level}</span>
                    <span className="text-yellow-400 text-sm">{userData.experience}/{userData.maxExperience} XP</span>
                  </div>
                  <Progress value={(userData.experience / userData.maxExperience) * 100} className="h-3 bg-slate-700" />
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">總金幣</span>
                    <span className="text-yellow-400 font-bold">{userData.coins.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">總競標次數</span>
                    <span className="text-white font-bold">{userData.totalBids}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">獲勝次數</span>
                    <span className="text-green-400 font-bold">{userData.wonAuctions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">勝率</span>
                    <span className="text-blue-400 font-bold">{userData.winRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-yellow-400" />
                  道具背包
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {inventory.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-2 rounded-lg bg-slate-700/30">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">{item.name}</h4>
                      <p className="text-gray-400 text-xs">{item.rarity}</p>
                    </div>
                    <Badge variant="secondary" className="bg-slate-600 text-white">
                      x{item.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Achievements */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  成就系統
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-4 rounded-lg border ${
                        achievement.completed 
                          ? 'bg-green-900/20 border-green-400' 
                          : 'bg-slate-700/30 border-slate-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className={`font-bold ${
                            achievement.completed ? 'text-green-400' : 'text-white'
                          }`}>
                            {achievement.name}
                          </h4>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                        </div>
                        {achievement.completed && (
                          <Badge className="bg-green-600 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            完成
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <History className="h-6 w-6 text-yellow-400" />
                  最近活動
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-slate-700/30">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'win' ? 'bg-green-600' : 'bg-blue-600'
                    }`}>
                      {activity.type === 'win' ? 
                        <Trophy className="h-4 w-4 text-white" /> : 
                        <Sword className="h-4 w-4 text-white" />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">
                          {activity.type === 'win' ? '贏得' : '競標'} {activity.item}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={activity.type === 'win' ? 'border-green-400 text-green-400' : 'border-blue-400 text-blue-400'}
                        >
                          {activity.type === 'win' ? '獲勝' : '出價'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-yellow-400 font-bold">{activity.price}</span>
                        <span className="text-gray-400 text-sm">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}