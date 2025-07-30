"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, Sword, Star } from "lucide-react"
import { useState, useEffect } from "react"

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

interface ProductCardProps {
  product: Product
}

// Rarity system - assign rarity based on price
function getProductRarity(price: number) {
  if (price >= 200000) return { level: "legendary", color: "border-orange-500", bg: "bg-orange-500/10", text: "text-orange-400" }
  if (price >= 100000) return { level: "epic", color: "border-purple-500", bg: "bg-purple-500/10", text: "text-purple-400" }
  if (price >= 50000) return { level: "rare", color: "border-blue-500", bg: "bg-blue-500/10", text: "text-blue-400" }
  return { level: "common", color: "border-gray-500", bg: "bg-gray-500/10", text: "text-gray-400" }
}

// Convert product name to RPG style
function getRPGName(name: string) {
  const prefixes = ["+5 附魔", "史詩級", "傳說", "稀有", "魔法", "神聖", "暗黑", "閃耀"]
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  return `${randomPrefix} ${name}`
}

export function ProductCard({ product }: ProductCardProps) {
  const [timeLeft, setTimeLeft] = useState(Math.floor(Math.random() * 86400)) // Random seconds left
  const [bidders, setBidders] = useState(Math.floor(Math.random() * 20) + 1)
  const [currentBid, setCurrentBid] = useState(product.price_in_cents)
  const [isHovered, setIsHovered] = useState(false)

  const rarity = getProductRarity(product.price_in_cents)
  const rpgName = getRPGName(product.name)

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time left
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

  // Get status based on time left
  const getStatus = () => {
    if (timeLeft < 3600) return { text: "即將結束", color: "bg-red-500", animate: "animate-pulse" }
    if (timeLeft < 7200) return { text: "火熱競標中", color: "bg-orange-500", animate: "" }
    return { text: "競標進行中", color: "bg-green-500", animate: "" }
  }

  const status = getStatus()

  return (
    <Link href={`/auction/${product.id}`}>
      <Card 
        className={`
          group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl
          ${rarity.color} border-2 ${rarity.bg} backdrop-blur-sm
          ${isHovered ? 'shadow-lg shadow-current/20' : ''}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      <CardContent className="p-0">
        {/* Status Badge */}
        <div className="relative">
          <Badge 
            className={`absolute top-2 left-2 z-10 ${status.color} text-white border-0 ${status.animate}`}
          >
            {status.text}
          </Badge>
          
          {/* Rarity Badge */}
          <Badge 
            variant="outline"
            className={`absolute top-2 right-2 z-10 ${rarity.color} ${rarity.text} bg-black/50 backdrop-blur-sm`}
          >
            <Star className="h-3 w-3 mr-1" />
            {rarity.level === 'legendary' ? '傳說' : 
             rarity.level === 'epic' ? '史詩' : 
             rarity.level === 'rare' ? '稀有' : '普通'}
          </Badge>

          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <Image
              src={product.image_url}
              alt={rpgName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Name */}
          <h3 className="font-bold text-lg text-white leading-tight line-clamp-2">
            {rpgName}
          </h3>

          {/* Current Bid */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">當前出價</span>
            <span className="text-xl font-bold text-yellow-400">
              {formatPrice(currentBid)}
            </span>
          </div>

          {/* Time Left */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm">剩餘時間</span>
            </div>
            <span className={`font-mono text-sm ${timeLeft < 3600 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {formatTimeLeft(timeLeft)}
            </span>
          </div>

          {/* Bidders Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-400">
              <Users className="h-4 w-4" />
              <span className="text-sm">勇者挑戰數</span>
            </div>
            <span className="text-sm text-white">{bidders}</span>
          </div>

          {/* Action Button */}
          <Button 
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold border-0 transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/20"
            size="lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Sword className="h-4 w-4 mr-2" />
            進入戰場
          </Button>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}