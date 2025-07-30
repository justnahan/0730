import { Metadata } from 'next'
import { RPGNavigation } from "@/components/rpg-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Package, 
  Sword, 
  Shield, 
  Sparkles, 
  Star,
  Eye,
  Clock,
  Clover,
  Zap,
  Target,
  ArrowUp,
  Coins,
  Trash2
} from "lucide-react"

export const metadata: Metadata = {
  title: '道具背包 | 拍賣競技場',
  description: '管理你的道具收藏，使用強化和出售功能',
}

interface Item {
  id: number
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical'
  type: 'attack' | 'defense' | 'support' | 'special'
  count: number
  level: number
  effects: string[]
  cooldown?: number
  value: number
}

export default function InventoryPage() {
  const inventoryItems: Item[] = [
    {
      id: 1,
      name: "狙擊手套",
      description: "最後10秒自動出價，提高勝率",
      icon: "🎯",
      rarity: "epic",
      type: "attack",
      count: 2,
      level: 3,
      effects: ["最後10秒自動出價", "勝率提升15%"],
      cooldown: 300,
      value: 450
    },
    {
      id: 2,
      name: "守護之盾",
      description: "免疫一次被超越，持續5分鐘",
      icon: "🛡️",
      rarity: "rare",
      type: "defense",
      count: 4,
      level: 2,
      effects: ["免疫一次超越", "持續300秒"],
      cooldown: 600,
      value: 200
    },
    {
      id: 3,
      name: "時間沙漏",
      description: "延長拍賣結束時間5分鐘",
      icon: "⏳",
      rarity: "legendary",
      type: "support",
      count: 1,
      level: 5,
      effects: ["延長競標時間300秒", "僅限史詩級以上物品"],
      cooldown: 1800,
      value: 800
    },
    {
      id: 4,
      name: "透視水晶",
      description: "查看所有競標者的資訊",
      icon: "🔮",
      rarity: "rare",
      type: "support",
      count: 6,
      level: 1,
      effects: ["顯示競標者等級", "顯示勝率資訊"],
      cooldown: 120,
      value: 150
    },
    {
      id: 5,
      name: "幸運硬幣",
      description: "下次出價必定成功",
      icon: "🪙",
      rarity: "mythical",
      type: "special",
      count: 1,
      level: 1,
      effects: ["下次出價100%成功", "限制條件：金額不超過底價200%"],
      cooldown: 86400,
      value: 2000
    },
    {
      id: 6,
      name: "連擊之刃",
      description: "可連續對多個商品出價",
      icon: "⚔️",
      rarity: "epic",
      type: "attack",
      count: 3,
      level: 4,
      effects: ["無冷卻連續出價", "最多連擊5次"],
      cooldown: 450,
      value: 600
    },
    {
      id: 7,
      name: "隱身斗篷",
      description: "隱藏自己的出價記錄30分鐘",
      icon: "🥷",
      rarity: "rare",
      type: "defense",
      count: 2,
      level: 2,
      effects: ["隱藏出價記錄", "持續1800秒"],
      cooldown: 900,
      value: 300
    },
    {
      id: 8,
      name: "復活羽毛",
      description: "失敗後可重新參與該拍賣一次",
      icon: "🪶",
      rarity: "legendary",
      type: "special",
      count: 1,
      level: 1,
      effects: ["競標失敗後復活機會", "僅限當次拍賣"],
      cooldown: 3600,
      value: 1200
    }
  ]

  const getRarityInfo = (rarity: string) => {
    switch (rarity) {
      case "mythical":
        return { 
          color: "border-red-500 bg-red-900/20 text-red-400", 
          bgGlow: "shadow-red-500/30",
          name: "神話" 
        }
      case "legendary":
        return { 
          color: "border-orange-500 bg-orange-900/20 text-orange-400", 
          bgGlow: "shadow-orange-500/30",
          name: "傳說" 
        }
      case "epic":
        return { 
          color: "border-purple-500 bg-purple-900/20 text-purple-400", 
          bgGlow: "shadow-purple-500/30",
          name: "史詩" 
        }
      case "rare":
        return { 
          color: "border-blue-500 bg-blue-900/20 text-blue-400", 
          bgGlow: "shadow-blue-500/30",
          name: "稀有" 
        }
      default:
        return { 
          color: "border-gray-500 bg-gray-900/20 text-gray-400", 
          bgGlow: "shadow-gray-500/30",
          name: "普通" 
        }
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "attack": return <Sword className="h-4 w-4" />
      case "defense": return <Shield className="h-4 w-4" />
      case "support": return <Sparkles className="h-4 w-4" />
      case "special": return <Star className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "attack": return "text-red-400"
      case "defense": return "text-blue-400"
      case "support": return "text-green-400"
      case "special": return "text-purple-400"
      default: return "text-gray-400"
    }
  }

  const filterItemsByType = (type: string) => {
    if (type === "all") return inventoryItems
    return inventoryItems.filter(item => item.type === type)
  }

  const ItemCard = ({ item }: { item: Item }) => {
    const rarityInfo = getRarityInfo(item.rarity)
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Card className={`${rarityInfo.color} ${rarityInfo.bgGlow} shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}>
            <CardHeader className="text-center pb-2">
              <div className="text-4xl mb-2">{item.icon}</div>
              <CardTitle className="text-white text-sm">{item.name}</CardTitle>
              <div className="flex justify-center items-center space-x-2">
                <Badge variant="outline" className={rarityInfo.color}>
                  {rarityInfo.name}
                </Badge>
                <Badge variant="outline" className={`${getTypeColor(item.type)} border-current`}>
                  {getTypeIcon(item.type)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">等級 {item.level}</span>
                <Badge variant="secondary" className="bg-slate-600 text-white">
                  x{item.count}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <div className="text-center">
              <div className="text-6xl mb-4">{item.icon}</div>
              <DialogTitle className="text-xl text-white">{item.name}</DialogTitle>
              <div className="flex justify-center items-center space-x-2 mt-2">
                <Badge variant="outline" className={rarityInfo.color}>
                  {rarityInfo.name}
                </Badge>
                <Badge variant="outline" className={`${getTypeColor(item.type)} border-current`}>
                  {getTypeIcon(item.type)}
                </Badge>
              </div>
            </div>
          </DialogHeader>
          
          <DialogDescription className="text-gray-300 text-center">
            {item.description}
          </DialogDescription>

          <div className="space-y-4">
            {/* Effects */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">道具效果</h4>
              <div className="space-y-1">
                {item.effects.map((effect, index) => (
                  <div key={index} className="text-sm text-gray-300 flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 mr-2 flex-shrink-0" />
                    {effect}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">等級</span>
                <div className="text-white font-bold">{item.level}</div>
              </div>
              <div>
                <span className="text-gray-400">數量</span>
                <div className="text-white font-bold">x{item.count}</div>
              </div>
              {item.cooldown && (
                <div>
                  <span className="text-gray-400">冷卻時間</span>
                  <div className="text-white font-bold">{item.cooldown}秒</div>
                </div>
              )}
              <div>
                <span className="text-gray-400">價值</span>
                <div className="text-yellow-400 font-bold">{item.value} 金幣</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <Zap className="h-4 w-4 mr-2" />
                使用
              </Button>
              <Button variant="outline" className="flex-1 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black">
                <ArrowUp className="h-4 w-4 mr-2" />
                強化
              </Button>
              <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <RPGNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              道具背包
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            管理你的珍貴道具收藏
          </p>
        </div>

        {/* User Currency */}
        <div className="flex justify-center mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="flex items-center space-x-4 p-4">
              <div className="flex items-center space-x-2">
                <Coins className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-semibold">金幣</span>
                <span className="text-yellow-400 font-bold">2,350</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                <span className="text-white font-semibold">寶石</span>
                <span className="text-blue-400 font-bold">15</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 mb-8">
            <TabsTrigger value="all" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              全部
            </TabsTrigger>
            <TabsTrigger value="attack" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <Sword className="h-4 w-4 mr-2" />
              攻擊型
            </TabsTrigger>
            <TabsTrigger value="defense" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Shield className="h-4 w-4 mr-2" />
              防禦型
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <Sparkles className="h-4 w-4 mr-2" />
              輔助型
            </TabsTrigger>
            <TabsTrigger value="special" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Star className="h-4 w-4 mr-2" />
              特殊型
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {inventoryItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
              {/* Empty slots */}
              {Array.from({ length: 6 }, (_, i) => (
                <Card key={`empty-${i}`} className="border-dashed border-slate-600 bg-slate-800/20">
                  <CardContent className="flex items-center justify-center h-32">
                    <Package className="h-8 w-8 text-slate-600" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attack">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filterItemsByType("attack").map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="defense">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filterItemsByType("defense").map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="support">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filterItemsByType("support").map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="special">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filterItemsByType("special").map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Inventory Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-white">{inventoryItems.length}</div>
              <div className="text-sm text-gray-400">道具種類</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-white">
                {inventoryItems.reduce((sum, item) => sum + item.count, 0)}
              </div>
              <div className="text-sm text-gray-400">總數量</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-yellow-400">
                {inventoryItems.reduce((sum, item) => sum + (item.value * item.count), 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">總價值</div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-purple-400">
                {inventoryItems.filter(item => ["legendary", "mythical"].includes(item.rarity)).length}
              </div>
              <div className="text-sm text-gray-400">稀有道具</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}