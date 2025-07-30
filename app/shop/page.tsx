import { Metadata } from 'next'
import { RPGNavigation } from "@/components/rpg-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gem, Eye, Clock, Clover, ShoppingCart } from "lucide-react"

export const metadata: Metadata = {
  title: '道具商店 | 拍賣競技場',
  description: '購買神奇道具，增強你的競標能力',
}

export default function ShopPage() {
  const items = [
    { 
      id: 1, 
      name: "透視鏡", 
      description: "查看其他競標者的出價歷史", 
      price: 150, 
      icon: "🔍",
      rarity: "稀有"
    },
    { 
      id: 2, 
      name: "時間延長卡", 
      description: "為心儀商品增加競標時間", 
      price: 200, 
      icon: "⏰",
      rarity: "史詩"
    },
    { 
      id: 3, 
      name: "幸運符", 
      description: "提高在最後時刻獲勝的機率", 
      price: 100, 
      icon: "🍀",
      rarity: "普通"
    },
    { 
      id: 4, 
      name: "經驗加倍卡", 
      description: "下次競標獲得雙倍經驗值", 
      price: 300, 
      icon: "⭐",
      rarity: "傳說"
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "傳說": return "border-orange-500 text-orange-400"
      case "史詩": return "border-purple-500 text-purple-400"
      case "稀有": return "border-blue-500 text-blue-400"
      default: return "border-gray-500 text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <RPGNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              神奇道具商店
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            購買強大道具，成為拍賣場上的無敵戰士！
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="bg-slate-800/50 border-slate-700 hover:scale-105 transition-transform">
              <CardHeader className="text-center">
                <div className="text-6xl mb-2">{item.icon}</div>
                <CardTitle className="text-white text-lg">{item.name}</CardTitle>
                <Badge 
                  variant="outline" 
                  className={getRarityColor(item.rarity)}
                >
                  {item.rarity}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400 text-sm text-center">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-center space-x-2">
                  <Gem className="h-4 w-4 text-yellow-400" />
                  <span className="text-xl font-bold text-yellow-400">
                    {item.price}
                  </span>
                  <span className="text-sm text-gray-400">金幣</span>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  購買
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Badge variant="outline" className="border-blue-400 text-blue-400 mb-4">
            <Gem className="h-4 w-4 mr-2" />
            每日特價商品
          </Badge>
          <p className="text-gray-400">
            每天都有不同的特價道具，記得常來看看！
          </p>
        </div>
      </div>
    </div>
  )
}