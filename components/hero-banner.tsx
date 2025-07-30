"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Swords, Trophy } from "lucide-react"

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Content */}
      <div className="relative px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Epic Announcement */}
          <Badge 
            variant="outline" 
            className="mb-4 border-yellow-400 text-yellow-400 bg-yellow-400/10 backdrop-blur-sm text-sm px-4 py-1"
          >
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            史詩級寶物現世
          </Badge>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              傳說級拍賣
            </span>
            <br />
            現正進行中
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            加入史上最激烈的競標戰鬥，收集稀有寶物，成為拍賣競技場的終極勇者！
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">147</div>
              <div className="text-sm text-gray-400">活躍勇者</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">23</div>
              <div className="text-sm text-gray-400">進行中拍賣</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">89</div>
              <div className="text-sm text-gray-400">稀有寶物</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Swords className="h-5 w-5 mr-2" />
              開始競標冒險
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-8 py-3 text-lg backdrop-blur-sm transition-all duration-200"
            >
              <Trophy className="h-5 w-5 mr-2" />
              查看排行榜
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 text-yellow-400/20 animate-bounce">
        <Sparkles className="h-8 w-8" />
      </div>
      <div className="absolute top-20 right-20 text-purple-400/20 animate-pulse">
        <Trophy className="h-6 w-6" />
      </div>
      <div className="absolute bottom-10 left-20 text-orange-400/20 animate-bounce delay-1000">
        <Swords className="h-7 w-7" />
      </div>
    </div>
  )
}