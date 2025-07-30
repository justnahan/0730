"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sword, Shield, Zap, Crown, Star, Coins } from "lucide-react"

export function RPGNavigation() {
  // Mock user data - in real app this would come from state/API
  const userData = {
    username: "勇者小明",
    level: 15,
    experience: 750,
    maxExperience: 1000,
    coins: 2350,
    avatar: "/placeholder-avatar.jpg"
  }

  // Mock quick items
  const quickItems = [
    { id: 1, name: "透視鏡", icon: "🔍", count: 3 },
    { id: 2, name: "時間延長卡", icon: "⏰", count: 1 },
    { id: 3, name: "幸運符", icon: "🍀", count: 5 },
  ]

  return (
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 border-b-4 border-yellow-500 shadow-lg">
      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-yellow-400">
              <Sword className="h-8 w-8" />
              <span className="text-2xl font-bold text-white">拍賣競技場</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-white hover:text-yellow-400 font-semibold border-b-2 border-transparent hover:border-yellow-400 transition-all duration-200"
            >
              首頁
            </Link>
            <Link 
              href="/auction" 
              className="text-white hover:text-yellow-400 font-semibold border-b-2 border-transparent hover:border-yellow-400 transition-all duration-200"
            >
              拍賣場
            </Link>
            <Link 
              href="/shop" 
              className="text-white hover:text-yellow-400 font-semibold border-b-2 border-transparent hover:border-yellow-400 transition-all duration-200"
            >
              道具商店
            </Link>
            <Link 
              href="/inventory" 
              className="text-white hover:text-yellow-400 font-semibold border-b-2 border-transparent hover:border-yellow-400 transition-all duration-200"
            >
              道具背包
            </Link>
            <Link 
              href="/skills" 
              className="text-white hover:text-yellow-400 font-semibold border-b-2 border-transparent hover:border-yellow-400 transition-all duration-200"
            >
              技能發展
            </Link>
            <Link 
              href="/leaderboard" 
              className="text-white hover:text-yellow-400 font-semibold border-b-2 border-transparent hover:border-yellow-400 transition-all duration-200"
            >
              排行榜
            </Link>
            <Link 
              href="/adventure" 
              className="text-white hover:text-yellow-400 font-semibold border-b-2 border-transparent hover:border-yellow-400 transition-all duration-200"
            >
              我的冒險
            </Link>
          </div>

          {/* User Status Area */}
          <div className="flex items-center space-x-4">
            {/* Quick Items Bar */}
            <div className="hidden lg:flex items-center space-x-2 bg-slate-700 rounded-lg p-2">
              {quickItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className="relative w-10 h-10 p-0 hover:bg-slate-600 text-white"
                  title={item.name}
                >
                  <span className="text-lg">{item.icon}</span>
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-yellow-500 text-black"
                  >
                    {item.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3 bg-slate-700 rounded-lg p-3">
              <Avatar className="h-10 w-10 border-2 border-yellow-500">
                <AvatarImage src={userData.avatar} alt={userData.username} />
                <AvatarFallback className="bg-slate-600 text-white">
                  {userData.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col space-y-1 min-w-[120px]">
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold text-sm">{userData.username}</span>
                  <Badge variant="outline" className="border-yellow-400 text-yellow-400 text-xs">
                    <Crown className="h-3 w-3 mr-1" />
                    Lv.{userData.level}
                  </Badge>
                </div>
                
                {/* Experience Bar */}
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={(userData.experience / userData.maxExperience) * 100} 
                    className="flex-1 h-2 bg-slate-600"
                  />
                  <span className="text-xs text-slate-300 whitespace-nowrap">
                    {userData.experience}/{userData.maxExperience}
                  </span>
                </div>
              </div>

              {/* Coins */}
              <div className="flex items-center space-x-1 text-yellow-400">
                <Coins className="h-4 w-4" />
                <span className="font-bold text-sm">{userData.coins.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}