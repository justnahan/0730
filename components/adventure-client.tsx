"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Settings,
  ArrowRight,
  Brain,
  Package,
  Coins,
  Eye,
  Sword,
  Shield,
  Star,
  Crown,
  Clock
} from "lucide-react"

interface Item {
  id: number
  name: string
  count: number
  icon: string
  rarity: string
  type: string
  cooldown: number
}

interface QuickActionsProps {
  onNavigate: (path: string) => void
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  return (
    <div className="space-y-3">
      <Button 
        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        onClick={() => onNavigate('/skills')}
      >
        <Brain className="h-4 w-4 mr-2" />
        技能發展
        <ArrowRight className="h-4 w-4 ml-auto" />
      </Button>
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => onNavigate('/inventory')}
      >
        <Package className="h-4 w-4 mr-2" />
        道具背包
        <ArrowRight className="h-4 w-4 ml-auto" />
      </Button>
      <Button 
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        onClick={() => onNavigate('/shop')}
      >
        <Coins className="h-4 w-4 mr-2" />
        道具商店
        <ArrowRight className="h-4 w-4 ml-auto" />
      </Button>
    </div>
  )
}

interface InventoryPreviewProps {
  inventory: Item[]
  onNavigate: (path: string) => void
}

export function InventoryPreview({ inventory, onNavigate }: InventoryPreviewProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "神話": return "border-red-500 text-red-400"
      case "傳說": return "border-orange-500 text-orange-400"
      case "史詩": return "border-purple-500 text-purple-400"
      case "稀有": return "border-blue-500 text-blue-400"
      default: return "border-gray-500 text-gray-400"
    }
  }
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "attack": return <Sword className="h-3 w-3" />
      case "defense": return <Shield className="h-3 w-3" />
      case "support": return <Star className="h-3 w-3" />
      case "special": return <Crown className="h-3 w-3" />
      default: return <Package className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-3">
      {inventory.slice(0, 3).map((item) => (
        <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600 hover:border-slate-500 transition-colors">
          <div className="text-2xl">{item.icon}</div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="text-white font-medium text-sm">{item.name}</h4>
              {getTypeIcon(item.type)}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline" className={`text-xs ${getRarityColor(item.rarity)}`}>
                {item.rarity}
              </Badge>
              {item.cooldown > 0 && (
                <Badge variant="secondary" className="text-xs bg-red-900 text-red-300">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.cooldown > 3600 ? `${Math.floor(item.cooldown / 3600)}h` : `${Math.floor(item.cooldown / 60)}m`}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge variant="secondary" className="bg-slate-600 text-white text-xs">
              x{item.count}
            </Badge>
            <Button 
              size="sm" 
              className="h-6 px-2 text-xs bg-green-600 hover:bg-green-700"
              disabled={item.cooldown > 0}
            >
              使用
            </Button>
          </div>
        </div>
      ))}
      {inventory.length > 3 && (
        <div className="text-center pt-2 border-t border-slate-600">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-yellow-400 hover:text-yellow-300"
            onClick={() => onNavigate('/inventory')}
          >
            +{inventory.length - 3} 更多道具...
          </Button>
        </div>
      )}
    </div>
  )
}