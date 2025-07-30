"use client"

import { Suspense } from "react"
import { RPGNavigation } from "@/components/rpg-navigation"
import { HeroBanner } from "@/components/hero-banner"
import { ProductCard } from "@/components/product-card"
import { ActivitySidebar } from "@/components/activity-sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Grid, List } from "lucide-react"
import { useState, useEffect } from "react"

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load products')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-slate-700 rounded-lg h-80"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* RPG Navigation */}
      <RPGNavigation />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Category Filters */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-bold text-white">拍賣寶物</h2>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="border-red-400 text-red-400">
                      攻擊型
                    </Badge>
                    <Badge variant="outline" className="border-blue-400 text-blue-400">
                      防禦型
                    </Badge>
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      輔助型
                    </Badge>
                    <Badge variant="outline" className="border-purple-400 text-purple-400">
                      收藏型
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Select defaultValue="hot">
                    <SelectTrigger className="w-[120px] bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="hot" className="text-white hover:bg-slate-600">熱度</SelectItem>
                      <SelectItem value="rarity" className="text-white hover:bg-slate-600">稀有度</SelectItem>
                      <SelectItem value="time" className="text-white hover:bg-slate-600">結束時間</SelectItem>
                      <SelectItem value="price" className="text-white hover:bg-slate-600">價格</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-slate-600 text-white hover:bg-slate-700"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-slate-700 rounded-lg h-80"></div>
                  </div>
                ))}
              </div>
            }>
              <ProductGrid />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ActivitySidebar />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-4">公會資訊</h3>
              <p className="text-gray-400 text-sm mb-2">加入最強公會，與夥伴並肩作戰</p>
              <Button variant="outline" size="sm" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black">
                加入聯盟
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-4">遊戲規則</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• 拍賣競標指南</li>
                <li>• 道具使用說明</li>
                <li>• 等級提升攻略</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-4">聯絡支援</h3>
              <p className="text-gray-400 text-sm mb-2">NPC 客服為您服務</p>
              <Button variant="outline" size="sm" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black">
                尋求幫助
              </Button>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-4 text-center">
            <p className="text-gray-500 text-sm">© 2024 拍賣競技場 - 全球最刺激的遊戲化拍賣平台</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
