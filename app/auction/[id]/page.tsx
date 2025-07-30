"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { RPGNavigation } from "@/components/rpg-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  BattleEffects, 
  createBattleEffect, 
  useScreenShake, 
  VictoryCelebration 
} from "@/components/battle-effects"
import { BattleEffect } from "@/components/battle-effects"
import { 
  Crown, 
  Sword, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  Zap, 
  Target,
  Trophy,
  Flame,
  Eye,
  Heart
} from "lucide-react"

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

interface Bidder {
  id: number
  username: string
  avatar: string
  level: number
  currentBid: number
  isLeader: boolean
  status: 'active' | 'defeated' | 'spectating'
  lastBidTime: number
  items: string[]
}


// Get rarity based on price
function getProductRarity(price: number) {
  if (price >= 200000) return { 
    level: "legendary", 
    color: "border-orange-500", 
    bg: "bg-orange-500/20", 
    text: "text-orange-400",
    glow: "shadow-orange-500/50"
  }
  if (price >= 100000) return { 
    level: "epic", 
    color: "border-purple-500", 
    bg: "bg-purple-500/20", 
    text: "text-purple-400",
    glow: "shadow-purple-500/50"
  }
  if (price >= 50000) return { 
    level: "rare", 
    color: "border-blue-500", 
    bg: "bg-blue-500/20", 
    text: "text-blue-400",
    glow: "shadow-blue-500/50"
  }
  return { 
    level: "common", 
    color: "border-gray-500", 
    bg: "bg-gray-500/20", 
    text: "text-gray-400",
    glow: "shadow-gray-500/50"
  }
}

// Convert product name to RPG style
function getRPGName(name: string) {
  const prefixes = ["+5 附魔", "史詩級", "傳說", "稀有", "魔法", "神聖", "暗黑", "閃耀"]
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  return `${randomPrefix} ${name}`
}

export default function AuctionDetailPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(3661) // 1 hour 1 minute 1 second
  const [currentBid, setCurrentBid] = useState(0)
  const [bidAmount, setBidAmount] = useState("")
  const [intensity, setIntensity] = useState(1) // 1-5 battle intensity
  const [battleEffects, setBattleEffects] = useState<BattleEffect[]>([])
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [isUsingItem, setIsUsingItem] = useState(false)
  const [showVictory, setShowVictory] = useState(false)
  const { isShaking, shake } = useScreenShake()

  // Mock bidders data
  const [bidders] = useState<Bidder[]>([
    {
      id: 1,
      username: "劍聖_無名",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      level: 45,
      currentBid: 298000,
      isLeader: true,
      status: 'active',
      lastBidTime: Date.now() - 30000,
      items: ['狙擊手套', '時間沙漏']
    },
    {
      id: 2,
      username: "魔法師_艾莉",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c717?w=100&h=100&fit=crop",
      level: 38,
      currentBid: 295000,
      isLeader: false,
      status: 'active',
      lastBidTime: Date.now() - 60000,
      items: ['守護之盾', '透視水晶']
    },
    {
      id: 3,
      username: "弓箭手_雷恩",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      level: 42,
      currentBid: 290000,
      isLeader: false,
      status: 'defeated',
      lastBidTime: Date.now() - 120000,
      items: ['連擊之刃']
    },
    {
      id: 4,
      username: "聖騎士_米亞",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      level: 35,
      currentBid: 285000,
      isLeader: false,
      status: 'spectating',
      lastBidTime: Date.now() - 180000,
      items: ['復活羽毛', '封印卷軸']
    }
  ])

  // User's items
  const userItems: Array<{
    name: string
    type: 'attack' | 'defense' | 'support'
    icon: any
    cooldown: number
    description: string
  }> = [
    { name: '狙擊手套', type: 'attack', icon: Target, cooldown: 0, description: '最後10秒自動出價' },
    { name: '守護之盾', type: 'defense', icon: Shield, cooldown: 30, description: '免疫一次被超越' },
    { name: '時間沙漏', type: 'support', icon: Clock, cooldown: 0, description: '延長拍賣時間5分鐘' },
    { name: '透視水晶', type: 'support', icon: Eye, cooldown: 60, description: '查看所有競標者資訊' }
  ]

  // Load product data
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const foundProduct = data.find((p: Product) => p.id === parseInt(productId))
        if (foundProduct) {
          setProduct(foundProduct)
          setCurrentBid(foundProduct.price_in_cents + Math.floor(Math.random() * 50000))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [productId])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Battle ends
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Calculate battle intensity based on bidders and time
  useEffect(() => {
    const activeBidders = bidders.filter(b => b.status === 'active').length
    const timeUrgency = timeLeft < 300 ? 2 : timeLeft < 600 ? 1 : 0
    setIntensity(Math.min(5, activeBidders + timeUrgency))
  }, [bidders, timeLeft])

  // Format time
  const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Format price
  const formatPrice = (cents: number) => {
    return `NT$${(cents / 100).toLocaleString()}`
  }

  // Handle bid
  const handleBid = () => {
    const newBidAmount = parseInt(bidAmount.replace(/[^0-9]/g, '')) * 100
    if (newBidAmount > currentBid) {
      setCurrentBid(newBidAmount)
      setBidAmount("")
      
      // Create battle effect at button position
      const effect = createBattleEffect(
        'attack',
        { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        { 
          itemName: '出價攻擊', 
          intensity: Math.min(5, Math.ceil(intensity)) as 1 | 2 | 3 | 4 | 5,
          duration: 1500 
        }
      )
      setBattleEffects(prev => [...prev.slice(-4), effect])
      
      // Screen shake on intense bids
      if (intensity >= 3) {
        shake(300)
      }
      
      // Victory check (simplified)
      if (Math.random() < 0.1 && timeLeft < 60) {
        setTimeout(() => setShowVictory(true), 2000)
      }
    }
  }

  // Handle item usage
  const handleUseItem = (itemName: string, type: 'attack' | 'defense' | 'support') => {
    setIsUsingItem(true)
    setSelectedItem(itemName)
    
    setTimeout(() => {
      // Create battle effect at appropriate position
      const effect = createBattleEffect(
        type,
        { 
          x: window.innerWidth * 0.75, // Right side where items are
          y: window.innerHeight * 0.6 
        },
        { 
          itemName, 
          intensity: (type === 'attack' ? 4 : type === 'defense' ? 3 : 2) as 1 | 2 | 3 | 4 | 5,
          duration: 2000
        }
      )
      setBattleEffects(prev => [...prev.slice(-4), effect])
      
      // Different effects based on item type
      if (type === 'attack') {
        shake(200)
        // Simulate effect on other bidders
        setTimeout(() => {
          const victimEffect = createBattleEffect(
            'defeat',
            { x: window.innerWidth * 0.25, y: window.innerHeight * 0.7 },
            { itemName: '被攻擊', intensity: 2 as 1 | 2 | 3 | 4 | 5 }
          )
          setBattleEffects(prev => [...prev.slice(-3), victimEffect])
        }, 500)
      }
      
      setIsUsingItem(false)
      setSelectedItem(null)
    }, 1500)
  }

  // Get battle atmosphere
  const getBattleAtmosphere = () => {
    if (timeLeft < 60) return {
      bg: "from-red-900 via-red-800 to-red-900",
      text: "決戰時刻！",
      color: "text-red-400",
      intensity: "animate-pulse"
    }
    if (intensity >= 4) return {
      bg: "from-orange-900 via-orange-800 to-orange-900",
      text: "激烈大戰！",
      color: "text-orange-400",
      intensity: ""
    }
    if (intensity >= 2) return {
      bg: "from-yellow-900 via-yellow-800 to-yellow-900",
      text: "緊張對峙",
      color: "text-yellow-400",
      intensity: ""
    }
    return {
      bg: "from-slate-900 via-slate-800 to-slate-900",
      text: "平靜競標",
      color: "text-blue-400",
      intensity: ""
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <RPGNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-slate-700 rounded-lg"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-32 bg-slate-700 rounded-lg"></div>
                <div className="h-48 bg-slate-700 rounded-lg"></div>
              </div>
              <div className="space-y-4">
                <div className="h-48 bg-slate-700 rounded-lg"></div>
                <div className="h-32 bg-slate-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <RPGNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-red-400 text-xl">寶物未找到</div>
            <p className="text-gray-400 mt-2">此神器可能已被其他勇者獲得</p>
          </div>
        </div>
      </div>
    )
  }

  const rarity = getProductRarity(product.price_in_cents)
  const rpgName = getRPGName(product.name)
  const atmosphere = getBattleAtmosphere()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${atmosphere.bg} transition-all duration-1000 ${isShaking ? 'animate-pulse' : ''}`}>
      <RPGNavigation />
      
      {/* Battle Effects Overlay */}
      <BattleEffects 
        effects={battleEffects} 
        onEffectComplete={(id) => {
          setBattleEffects(prev => prev.filter(e => e.id !== id))
        }}
      />
      
      {/* Victory Celebration */}
      <VictoryCelebration 
        isVisible={showVictory}
        onComplete={() => setShowVictory(false)}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Battle Status Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-black/30 border ${rarity.color} ${atmosphere.intensity}`}>
            <Flame className={`h-5 w-5 ${atmosphere.color}`} />
            <span className={`font-bold ${atmosphere.color}`}>
              {atmosphere.text}
            </span>
            <span className="text-white">・</span>
            <span className="text-white font-mono">
              {formatTimeLeft(timeLeft)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Product Display - "Holy Relic" */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sacred Item Display */}
            <Card className={`${rarity.bg} ${rarity.color} border-2 backdrop-blur-sm ${isUsingItem ? 'animate-pulse' : ''}`}>
              <CardContent className="p-0">
                <div className="relative">
                  {/* Sacred Aura Effect */}
                  <div className={`absolute inset-0 ${rarity.bg} rounded-lg blur-xl opacity-50 animate-pulse`}></div>
                  
                  <div className="relative aspect-square max-h-96 overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image_url}
                      alt={rpgName}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Sacred Light Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    
                    {/* Rarity Badge */}
                    <Badge className={`absolute top-4 right-4 ${rarity.color} ${rarity.text} bg-black/50 backdrop-blur-sm border-0`}>
                      <Star className="h-4 w-4 mr-1" />
                      {rarity.level === 'legendary' ? '傳說聖物' : 
                       rarity.level === 'epic' ? '史詩寶物' : 
                       rarity.level === 'rare' ? '稀有神器' : '普通道具'}
                    </Badge>

                    {/* Item Effects Overlay */}
                    {selectedItem && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl animate-ping">✨</div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <h1 className="text-3xl font-bold text-white leading-tight">
                      {rpgName}
                    </h1>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-gray-400">當前聖物價值</span>
                      <span className="text-3xl font-bold text-yellow-400">
                        {formatPrice(currentBid)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bidding Interface */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sword className="h-5 w-5 text-yellow-400" />
                  發動攻擊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="輸入攻擊力度（出價金額）"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                  />
                  <Button 
                    onClick={handleBid}
                    disabled={!bidAmount || parseInt(bidAmount.replace(/[^0-9]/g, '')) * 100 <= currentBid}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-3 transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    攻擊！
                  </Button>
                </div>
                
                {/* Quick Bid Buttons */}
                <div className="flex space-x-2">
                  {[1000, 5000, 10000].map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setBidAmount((currentBid / 100 + amount).toString())}
                      className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                    >
                      +{amount}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Battle Effects Feed */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-green-400" />
                  戰況實況
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {battleEffects.slice(-5).reverse().map(effect => (
                    <div key={effect.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">
                        <span className={`font-bold ${
                          effect.type === 'attack' ? 'text-red-400' :
                          effect.type === 'defense' ? 'text-blue-400' :
                          'text-green-400'
                        }`}>
                          你
                        </span>
                        {' '}使用了{' '}
                        <span className="text-yellow-400">{effect.itemName}</span>
                      </span>
                      <span className="text-gray-500">
                        剛才
                      </span>
                    </div>
                  ))}
                  {battleEffects.length === 0 && (
                    <div className="text-gray-500 text-sm text-center py-4">
                      戰鬥尚未開始...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Warriors Assembly & Items */}
          <div className="space-y-6">
            {/* Warriors Gathering */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  勇者集結 ({bidders.filter(b => b.status === 'active').length}/4)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {bidders.map(bidder => (
                  <div 
                    key={bidder.id} 
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      bidder.status === 'active' ? 'bg-slate-700/50 border border-slate-600' :
                      bidder.status === 'defeated' ? 'bg-red-900/20 border border-red-700' :
                      'bg-slate-600/20 border border-slate-500'
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={bidder.avatar} />
                      <AvatarFallback>{bidder.username[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${
                          bidder.isLeader ? 'text-yellow-400' : 'text-white'
                        }`}>
                          {bidder.username}
                        </span>
                        {bidder.isLeader && <Crown className="h-4 w-4 text-yellow-400" />}
                        <Badge variant="outline" className="text-xs border-blue-400 text-blue-400">
                          Lv.{bidder.level}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className={`${
                          bidder.status === 'active' ? 'text-green-400' :
                          bidder.status === 'defeated' ? 'text-red-400' :
                          'text-gray-400'
                        }`}>
                          {bidder.status === 'active' ? '戰鬥中' :
                           bidder.status === 'defeated' ? '已戰敗' :
                           '觀戰中'}
                        </span>
                        <span className="text-yellow-400 font-mono text-xs">
                          {formatPrice(bidder.currentBid)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Battle Items */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-400" />
                  戰鬥道具
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {userItems.map(item => {
                  const Icon = item.icon
                  const isOnCooldown = item.cooldown > 0
                  
                  return (
                    <Button
                      key={item.name}
                      variant="outline"
                      disabled={isOnCooldown || isUsingItem}
                      onClick={() => handleUseItem(item.name, item.type)}
                      className={`w-full justify-start p-4 h-auto ${
                        item.type === 'attack' ? 'border-red-400 hover:bg-red-400/10' :
                        item.type === 'defense' ? 'border-blue-400 hover:bg-blue-400/10' :
                        'border-green-400 hover:bg-green-400/10'
                      } ${isOnCooldown ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <Icon className={`h-5 w-5 ${
                          item.type === 'attack' ? 'text-red-400' :
                          item.type === 'defense' ? 'text-blue-400' :
                          'text-green-400'
                        }`} />
                        
                        <div className="flex-1 text-left">
                          <div className="font-medium text-white">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.description}</div>
                          {isOnCooldown && (
                            <div className="text-xs text-red-400">冷卻中: {item.cooldown}秒</div>
                          )}
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Battle Statistics */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-400" />
                  戰鬥數據
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">戰鬥強度</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={intensity * 20} className="w-16" />
                    <span className={`text-sm font-bold ${atmosphere.color}`}>
                      {intensity}/5
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">觀戰人數</span>
                  <span className="text-white">{bidders.filter(b => b.status === 'spectating').length + 23}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">總出價次數</span>
                  <span className="text-white">47</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}