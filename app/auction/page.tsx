import { Metadata } from 'next'
import { RPGNavigation } from "@/components/rpg-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Swords, Trophy, Timer, Users } from "lucide-react"

export const metadata: Metadata = {
  title: '拍賣場 | 拍賣競技場',
  description: '參與激烈的競標戰鬥，贏取珍稀寶物',
}

export default function AuctionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <RPGNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              拍賣競技場
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            在這裡展開你的競標冒險，每一次出價都是榮耀的戰鬥！
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Active Auctions */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Swords className="h-5 w-5 text-yellow-400" />
                進行中拍賣
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400 mb-2">23</div>
              <p className="text-gray-400">激烈競標中</p>
            </CardContent>
          </Card>

          {/* Total Participants */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                活躍勇者
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400 mb-2">147</div>
              <p className="text-gray-400">正在參與競標</p>
            </CardContent>
          </Card>

          {/* Ending Soon */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Timer className="h-5 w-5 text-red-400" />
                即將結束
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400 mb-2">8</div>
              <p className="text-gray-400">1小時內結束</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Badge variant="outline" className="border-yellow-400 text-yellow-400 mb-4">
            <Trophy className="h-4 w-4 mr-2" />
            競標功能開發中
          </Badge>
          <p className="text-gray-400">
            完整的拍賣系統即將上線，敬請期待更刺激的競標體驗！
          </p>
        </div>
      </div>
    </div>
  )
}