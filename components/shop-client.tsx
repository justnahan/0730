"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Coins, Filter, Sword, Shield, Sparkles, Star } from "lucide-react"

interface ShopClientProps {
  userData: {
    coins: number
    gems: number
  }
  items: Array<{
    id: number
    name: string
    description: string
    effects: string[]
    price: number
    icon: string
    rarity: string
    type: string
    cooldown?: number
  }>
}

export function ShopClient({ userData, items }: ShopClientProps) {
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
  
  const getTypeInfo = (type: string) => {
    switch (type) {
      case "attack": return { icon: <Sword className="h-4 w-4" />, color: "text-red-400", name: "攻擊型" }
      case "defense": return { icon: <Shield className="h-4 w-4" />, color: "text-blue-400", name: "防禦型" }
      case "support": return { icon: <Sparkles className="h-4 w-4" />, color: "text-green-400", name: "輔助型" }
      case "special": return { icon: <Star className="h-4 w-4" />, color: "text-purple-400", name: "特殊型" }
      default: return { icon: <Star className="h-4 w-4" />, color: "text-gray-400", name: "普通" }
    }
  }

  return (
    <>
      {/* User Currency */}
      <div className="flex justify-center mb-8">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="flex items-center space-x-6 p-4">
            <div className="flex items-center space-x-2">
              <Coins className="h-6 w-6 text-yellow-400" />
              <span className="text-white font-semibold text-lg">金幣</span>
              <span className="text-yellow-400 font-bold text-xl">{userData.coins.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
              <span className="text-white font-semibold text-lg">寶石</span>
              <span className="text-blue-400 font-bold text-xl">{userData.gems}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card className="bg-slate-800/50 border-slate-700 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-4">
            <Filter className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-semibold">道具類型：</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                全部
              </Button>
              <Button variant="outline" size="sm" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
                <Sword className="h-4 w-4 mr-1" />
                攻擊型
              </Button>
              <Button variant="outline" size="sm" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                <Shield className="h-4 w-4 mr-1" />
                防禦型
              </Button>
              <Button variant="outline" size="sm" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white">
                <Sparkles className="h-4 w-4 mr-1" />
                輔助型
              </Button>
              <Button variant="outline" size="sm" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                <Star className="h-4 w-4 mr-1" />
                特殊型
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => {
          const rarityInfo = getRarityInfo(item.rarity)
          const typeInfo = getTypeInfo(item.type)
          
          return (
            <Card key={item.id} className={`${rarityInfo.color} ${rarityInfo.bgGlow} shadow-lg hover:scale-105 transition-all duration-300`}>
              <CardHeader className="text-center">
                <div className="text-5xl mb-3">{item.icon}</div>
                <CardTitle className="text-white text-lg">{item.name}</CardTitle>
                <div className="flex justify-center items-center space-x-2">
                  <Badge variant="outline" className={rarityInfo.color}>
                    {rarityInfo.name}
                  </Badge>
                  <Badge variant="outline" className={`${typeInfo.color} border-current`}>
                    {typeInfo.icon}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm text-center font-medium">
                  {item.description}
                </p>
                
                {/* Effects */}
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-white">道具效果：</h4>
                  {item.effects.slice(0, 2).map((effect, index) => (
                    <div key={index} className="text-xs text-gray-300 flex items-center">
                      <Star className="h-2 w-2 text-yellow-400 mr-1 flex-shrink-0" />
                      {effect}
                    </div>
                  ))}
                </div>
                
                {/* Cooldown */}
                {item.cooldown && (
                  <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
                    <span>冷卻：{item.cooldown > 3600 ? `${Math.floor(item.cooldown / 3600)}h` : `${Math.floor(item.cooldown / 60)}m`}</span>
                  </div>
                )}
                
                {/* Price */}
                <div className="flex items-center justify-center space-x-2 py-2">
                  <Coins className="h-5 w-5 text-yellow-400" />
                  <span className="text-2xl font-bold text-yellow-400">
                    {item.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400">金幣</span>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold"
                  disabled={userData.coins < item.price}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {userData.coins < item.price ? "金幣不足" : "購買"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}