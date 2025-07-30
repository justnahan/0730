import { Metadata } from 'next'
import { RPGNavigation } from "@/components/rpg-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShopClient } from "@/components/shop-client"
import { Gem, Coins } from "lucide-react"

export const metadata: Metadata = {
  title: '道具商店 | 拍賣競技場',
  description: '購買神奇道具，增強你的競標能力',
}

export default function ShopPage() {
  const userData = {
    coins: 2350,
    gems: 15
  }

  const items = [
    // Attack Items
    { 
      id: 1, 
      name: "狙擊手套", 
      description: "最後10秒自動出價，提高勝率", 
      effects: ["最後10秒自動出價", "勝率提卵15%"],
      price: 450, 
      icon: "🎯",
      rarity: "epic",
      type: "attack",
      cooldown: 300
    },
    { 
      id: 2, 
      name: "連擊之刃", 
      description: "可連續對多個商品出價，無冷却", 
      effects: ["無冷却連續出價", "最多連擊5次"],
      price: 600, 
      icon: "⚔️",
      rarity: "epic",
      type: "attack",
      cooldown: 450
    },
    { 
      id: 3, 
      name: "破甲之矛", 
      description: "無視對手的防禦型道具效果", 
      effects: ["突破防禦道具", "攻擊力提卵20%"],
      price: 800, 
      icon: "🗡️",
      rarity: "legendary",
      type: "attack",
      cooldown: 600
    },
    
    // Defense Items
    { 
      id: 4, 
      name: "守護之盾", 
      description: "免疫一次被超越，持續5分鐘", 
      effects: ["免疫一次超越", "持續300秒"],
      price: 200, 
      icon: "🛡️",
      rarity: "rare",
      type: "defense",
      cooldown: 600
    },
    { 
      id: 5, 
      name: "隱身斗篷", 
      description: "隱藏自己的出價記錠30分鐘", 
      effects: ["隱藏出價記錄", "持續1800秒"],
      price: 300, 
      icon: "🥷",
      rarity: "rare",
      type: "defense",
      cooldown: 900
    },
    { 
      id: 6, 
      name: "反制護符", 
      description: "反彈對手的攻擊型道具效果", 
      effects: ["反彈攻擊道具", "造成雙倍傷害"],
      price: 550, 
      icon: "💫",
      rarity: "epic",
      type: "defense",
      cooldown: 720
    },
    
    // Support Items
    { 
      id: 7, 
      name: "時間沙漏", 
      description: "延長拍賣結束時間5分鐘", 
      effects: ["延長競標時間300秒", "僅限史詩級以上物品"],
      price: 800, 
      icon: "⏳",
      rarity: "legendary",
      type: "support",
      cooldown: 1800
    },
    { 
      id: 8, 
      name: "透視水晶", 
      description: "查看所有競標者的資訊", 
      effects: ["顯示競標者等級", "顯示勝率資訊"],
      price: 150, 
      icon: "🔮",
      rarity: "rare",
      type: "support",
      cooldown: 120
    },
    { 
      id: 9, 
      name: "幸運硬幣", 
      description: "下次出價必定成功（有限制條件）", 
      effects: ["下次出價100%成功", "限制條件：金額不超過底價200%"],
      price: 2000, 
      icon: "🪙",
      rarity: "mythical",
      type: "support",
      cooldown: 86400
    },
    
    // Special Items
    { 
      id: 10, 
      name: "復活羽毛", 
      description: "失敗後可重新參與該拍賣一次", 
      effects: ["競標失敗後復活機會", "僅限當次拍賣"],
      price: 1200, 
      icon: "🪶",
      rarity: "legendary",
      type: "special",
      cooldown: 3600
    },
    { 
      id: 11, 
      name: "封印卷軸", 
      description: "禁止其他用戶對指定商品使用道具", 
      effects: ["禁止對手使用道具", "持續整場拍賣"],
      price: 1500, 
      icon: "📜",
      rarity: "legendary",
      type: "special",
      cooldown: 2400
    },
    { 
      id: 12, 
      name: "傳送門", 
      description: "瞬間參與任意一個即將結束的拍賣", 
      effects: ["瞬間傳送到任意拍賣", "僅限最後30秒"],
      price: 3000, 
      icon: "🌀",
      rarity: "mythical",
      type: "special",
      cooldown: 7200
    }
  ]


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

        <ShopClient userData={userData} items={items} />

        {/* Daily Specials */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <Badge variant="outline" className="border-blue-400 text-blue-400 mb-4 text-lg px-4 py-2">
              <Gem className="h-5 w-5 mr-2" />
              每日特價區
            </Badge>
            <p className="text-gray-300 text-lg">
              限時優惠，手慢無！
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Daily Items */}
            <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500 shadow-yellow-500/20 shadow-lg">
              <CardHeader className="text-center relative">
                <Badge className="absolute top-2 right-2 bg-red-500 text-white animate-pulse">
                  -30%
                </Badge>
                <div className="text-4xl mb-2">🎯</div>
                <CardTitle className="text-white text-lg">狙擊手套</CardTitle>
                <div className="flex justify-center items-center space-x-2">
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    史詩
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg text-gray-400 line-through">450</span>
                  <Coins className="h-4 w-4 text-yellow-400" />
                  <span className="text-xl font-bold text-yellow-400">315</span>
                  <span className="text-sm text-gray-400">金幣</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold">
                  立即購買
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500 shadow-blue-500/20 shadow-lg">
              <CardHeader className="text-center relative">
                <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                  新品
                </Badge>
                <div className="text-4xl mb-2">🧿</div>
                <CardTitle className="text-white text-lg">時空護盾</CardTitle>
                <div className="flex justify-center items-center space-x-2">
                  <Badge variant="outline" className="border-orange-500 text-orange-400">
                    傳說
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-xs text-gray-300">免疫所有攻擊5分鐘</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                  <span className="text-xl font-bold text-blue-400">5</span>
                  <span className="text-sm text-gray-400">寶石</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold">
                  使用寶石購買
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border-green-500 shadow-green-500/20 shadow-lg">
              <CardHeader className="text-center relative">
                <Badge className="absolute top-2 right-2 bg-purple-500 text-white">
                  組合
                </Badge>
                <div className="text-4xl mb-2">🎁</div>
                <CardTitle className="text-white text-lg">新手禮包</CardTitle>
                <div className="flex justify-center items-center space-x-2">
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    特殊
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-xs text-gray-300">隨機3個道具 + 500金幣</p>
                <div className="flex items-center justify-center space-x-2">
                  <Coins className="h-4 w-4 text-yellow-400" />
                  <span className="text-xl font-bold text-yellow-400">999</span>
                  <span className="text-sm text-gray-400">金幣</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold">
                  購買禮包
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}