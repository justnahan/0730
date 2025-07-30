import { Metadata } from 'next'
import { RPGNavigation } from "@/components/rpg-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Target, 
  Package, 
  Gem, 
  Zap,
  Star,
  Crown,
  TrendingUp,
  Shield,
  Clock,
  Eye,
  ArrowRight,
  Lock,
  Check
} from "lucide-react"

export const metadata: Metadata = {
  title: '技能發展 | 拍賣競技場',
  description: '學習新技能，成為拍賣場上的專家',
}

interface Skill {
  id: number
  name: string
  description: string
  effects: string[]
  icon: string
  learned: boolean
  level: number
  maxLevel: number
  cost: number
  prerequisites: number[]
  position: { x: number; y: number }
}

interface SkillTree {
  [key: string]: Skill[]
}

export default function SkillsPage() {
  const userSkillPoints = 8
  const userLevel = 15

  const skillTrees: SkillTree = {
    bidding: [
      {
        id: 101,
        name: "快速出價",
        description: "提高出價速度和響應時間",
        effects: ["出價冷卻時間減少20%", "出價成功率提升5%"],
        icon: "⚡",
        learned: true,
        level: 3,
        maxLevel: 5,
        cost: 1,
        prerequisites: [],
        position: { x: 1, y: 1 }
      },
      {
        id: 102,
        name: "精準狙擊",
        description: "在最後關鍵時刻的出價能力",
        effects: ["最後30秒出價成功率提升15%", "關鍵時刻不受干擾"],
        icon: "🎯",
        learned: true,
        level: 2,
        maxLevel: 3,
        cost: 2,
        prerequisites: [101],
        position: { x: 2, y: 1 }
      },
      {
        id: 103,
        name: "最後一擊",
        description: "專精於最後時刻的決定性出價",
        effects: ["最後10秒出價威力提升25%", "免疫同時出價干擾"],
        icon: "💥",
        learned: false,
        level: 0,
        maxLevel: 3,
        cost: 3,
        prerequisites: [102],
        position: { x: 3, y: 1 }
      },
      {
        id: 104,
        name: "連勝加成",
        description: "連續獲勝時獲得額外優勢",
        effects: ["連勝3次後下次出價成功率+10%", "連勝5次後獲得額外經驗"],
        icon: "🔥",
        learned: false,
        level: 0,
        maxLevel: 4,
        cost: 2,
        prerequisites: [101],
        position: { x: 2, y: 2 }
      },
      {
        id: 105,
        name: "心理戰術",
        description: "通過策略迷惑對手",
        effects: ["虛假出價次數+2", "對手焦慮值增加"],
        icon: "🧠",
        learned: false,
        level: 0,
        maxLevel: 3,
        cost: 4,
        prerequisites: [102, 104],
        position: { x: 3, y: 2 }
      }
    ],
    items: [
      {
        id: 201,
        name: "道具精通",
        description: "提高所有道具的使用效果",
        effects: ["所有道具效果提升10%", "道具使用成功率+5%"],
        icon: "🔧",
        learned: true,
        level: 2,
        maxLevel: 5,
        cost: 1,
        prerequisites: [],
        position: { x: 1, y: 1 }
      },
      {
        id: 202,
        name: "冷卻減免",
        description: "減少道具的冷卻時間",
        effects: ["所有道具冷卻時間減少15%", "冷卻期間獲得小幅加成"],
        icon: "⏰",
        learned: true,
        level: 1,
        maxLevel: 4,
        cost: 2,
        prerequisites: [201],
        position: { x: 2, y: 1 }
      },
      {
        id: 203,
        name: "效果增強",
        description: "大幅提升道具效果威力",
        effects: ["稀有以上道具效果提升25%", "效果持續時間延長"],
        icon: "✨",
        learned: false,
        level: 0,
        maxLevel: 3,
        cost: 3,
        prerequisites: [202],
        position: { x: 3, y: 1 }
      },
      {
        id: 204,
        name: "道具合成",
        description: "將低級道具合成為高級道具",
        effects: ["可合成更高稀有度道具", "合成成功率+20%"],
        icon: "⚗️",
        learned: false,
        level: 0,
        maxLevel: 3,
        cost: 4,
        prerequisites: [201],
        position: { x: 2, y: 2 }
      },
      {
        id: 205,
        name: "大師級精通",
        description: "成為真正的道具大師",
        effects: ["可同時使用2個道具", "道具效果不會相互干擾"],
        icon: "👑",
        learned: false,
        level: 0,
        maxLevel: 1,
        cost: 5,
        prerequisites: [203, 204],
        position: { x: 3, y: 2 }
      }
    ],
    collection: [
      {
        id: 301,
        name: "價值評估",
        description: "更準確地判斷物品真實價值",
        effects: ["顯示物品建議價格範圍", "發現低估商品的機率+10%"],
        icon: "💰",
        learned: true,
        level: 3,
        maxLevel: 5,
        cost: 1,
        prerequisites: [],
        position: { x: 1, y: 1 }
      },
      {
        id: 302,
        name: "稀有探測",
        description: "發現隱藏的珍貴物品",
        effects: ["稀有物品出現提醒", "稀有度識別準確率+20%"],
        icon: "🔍",
        learned: true,
        level: 2,
        maxLevel: 4,
        cost: 2,
        prerequisites: [301],
        position: { x: 2, y: 1 }
      },
      {
        id: 303,
        name: "收藏加成",
        description: "收藏相同系列物品時獲得獎勵",
        effects: ["套裝收藏獲得額外經驗", "收藏價值提升15%"],
        icon: "📚",
        learned: false,
        level: 0,
        maxLevel: 3,
        cost: 2,
        prerequisites: [301],
        position: { x: 2, y: 2 }
      },
      {
        id: 304,
        name: "專家眼光",
        description: "一眼識別物品的潛在價值",
        effects: ["預測物品未來價值趨勢", "發現升值潛力商品"],
        icon: "👁️",
        learned: false,
        level: 0,
        maxLevel: 4,
        cost: 3,
        prerequisites: [302],
        position: { x: 3, y: 1 }
      },
      {
        id: 305,
        name: "收藏家傳說",
        description: "成為傳說級的收藏大師",
        effects: ["所有收藏品價值+25%", "解鎖專屬收藏成就"],
        icon: "🏆",
        learned: false,
        level: 0,
        maxLevel: 1,
        cost: 5,
        prerequisites: [303, 304],
        position: { x: 3, y: 2 }
      }
    ]
  }

  const getSkillByPrereq = (treeSkills: Skill[], prereqId: number) => {
    return treeSkills.find(skill => skill.id === prereqId)
  }

  const canLearnSkill = (skill: Skill, treeSkills: Skill[]) => {
    // Check if user has enough skill points
    if (userSkillPoints < skill.cost) return false
    
    // Check if all prerequisites are learned
    return skill.prerequisites.every(prereqId => {
      const prereqSkill = getSkillByPrereq(treeSkills, prereqId)
      return prereqSkill?.learned || false
    })
  }

  const SkillNode = ({ skill, treeSkills }: { skill: Skill; treeSkills: Skill[] }) => {
    const canLearn = canLearnSkill(skill, treeSkills)
    const isMaxLevel = skill.level >= skill.maxLevel
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer`}
            style={{ 
              left: `${skill.position.x * 150}px`, 
              top: `${skill.position.y * 120}px` 
            }}
          >
            <Card className={`w-20 h-20 ${
              skill.learned 
                ? 'bg-yellow-900/50 border-yellow-500 shadow-yellow-500/30' 
                : canLearn 
                ? 'bg-slate-700/50 border-slate-500 hover:border-yellow-400' 
                : 'bg-slate-800/30 border-slate-600 opacity-50'
            } shadow-lg transition-all duration-300 hover:scale-110`}>
              <CardContent className="flex items-center justify-center h-full p-0">
                <div className="text-2xl relative">
                  {skill.icon}
                  {skill.learned && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-2 h-2 text-white" />
                    </div>
                  )}
                  {!skill.learned && !canLearn && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <Lock className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {skill.learned && skill.level > 0 && (
              <Badge 
                variant="secondary" 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs"
              >
                Lv.{skill.level}
              </Badge>
            )}
          </div>
        </DialogTrigger>
        
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <div className="text-center">
              <div className="text-6xl mb-4">{skill.icon}</div>
              <DialogTitle className="text-xl text-white">{skill.name}</DialogTitle>
              <div className="flex justify-center items-center space-x-2 mt-2">
                {skill.learned ? (
                  <Badge className="bg-green-600 text-white">
                    <Check className="h-3 w-3 mr-1" />
                    已學習
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                    未學習
                  </Badge>
                )}
                <Badge variant="outline" className="border-blue-400 text-blue-400">
                  Lv.{skill.level}/{skill.maxLevel}
                </Badge>
              </div>
            </div>
          </DialogHeader>
          
          <DialogDescription className="text-gray-300 text-center">
            {skill.description}
          </DialogDescription>

          <div className="space-y-4">
            {/* Effects */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">技能效果</h4>
              <div className="space-y-1">
                {skill.effects.map((effect, index) => (
                  <div key={index} className="text-sm text-gray-300 flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 mr-2 flex-shrink-0" />
                    {effect}
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            {skill.prerequisites.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">前置技能</h4>
                <div className="space-y-1">
                  {skill.prerequisites.map((prereqId) => {
                    const prereqSkill = getSkillByPrereq(treeSkills, prereqId)
                    return prereqSkill ? (
                      <div key={prereqId} className="text-sm flex items-center">
                        <span className="mr-2">{prereqSkill.icon}</span>
                        <span className={prereqSkill.learned ? "text-green-400" : "text-red-400"}>
                          {prereqSkill.name}
                        </span>
                        {prereqSkill.learned && <Check className="h-3 w-3 text-green-400 ml-1" />}
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            )}

            {/* Cost and Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-600">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-yellow-400 font-bold">{skill.cost} 技能點</span>
              </div>
              
              {skill.learned ? (
                <Button 
                  disabled={isMaxLevel}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isMaxLevel ? "已滿級" : "升級"}
                </Button>
              ) : (
                <Button 
                  disabled={!canLearn}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  學習
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const SkillTree = ({ skills }: { skills: Skill[] }) => {
    return (
      <div className="relative h-96 bg-slate-800/30 rounded-lg border border-slate-700 overflow-hidden">
        {/* Skill connections - simplified lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {skills.map(skill => 
            skill.prerequisites.map(prereqId => {
              const prereqSkill = skills.find(s => s.id === prereqId)
              if (!prereqSkill) return null
              
              return (
                <line
                  key={`${skill.id}-${prereqId}`}
                  x1={prereqSkill.position.x * 150}
                  y1={prereqSkill.position.y * 120}
                  x2={skill.position.x * 150}
                  y2={skill.position.y * 120}
                  stroke={skill.learned && prereqSkill.learned ? "#fbbf24" : "#475569"}
                  strokeWidth="2"
                  strokeDasharray={skill.learned && prereqSkill.learned ? "0" : "5,5"}
                />
              )
            })
          )}
        </svg>
        
        {/* Skill nodes */}
        {skills.map(skill => (
          <SkillNode key={skill.id} skill={skill} treeSkills={skills} />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <RPGNavigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              技能發展
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            選擇專精方向，成為拍賣場上的專家
          </p>
        </div>

        {/* Skill Points Display */}
        <div className="flex justify-center mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="flex items-center space-x-4 p-4">
              <div className="flex items-center space-x-2">
                <Star className="h-6 w-6 text-yellow-400" />
                <span className="text-white font-semibold text-lg">可用技能點</span>
                <Badge className="bg-yellow-500 text-black text-lg px-3 py-1">
                  {userSkillPoints}
                </Badge>
              </div>
              <div className="text-sm text-gray-400">
                每升級獲得1點技能點
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skill Trees */}
        <Tabs defaultValue="bidding" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 mb-8">
            <TabsTrigger value="bidding" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              <Target className="h-5 w-5 mr-2" />
              競標專精
            </TabsTrigger>
            <TabsTrigger value="items" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Package className="h-5 w-5 mr-2" />
              道具專精
            </TabsTrigger>
            <TabsTrigger value="collection" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Gem className="h-5 w-5 mr-2" />
              收藏專精
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bidding">
            <Card className="bg-slate-800/50 border-slate-700 mb-4">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="h-6 w-6 text-red-400" />
                  競標專精
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  專注於提高競標成功率和效率。學習快速出價、精準狙擊等技能，成為拍賣場上的狙擊手。
                </p>
                <SkillTree skills={skillTrees.bidding} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="items">
            <Card className="bg-slate-800/50 border-slate-700 mb-4">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="h-6 w-6 text-purple-400" />
                  道具專精
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  專注於道具的使用和效果最大化。學習道具精通、效果增強等技能，成為道具使用大師。
                </p>
                <SkillTree skills={skillTrees.items} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collection">
            <Card className="bg-slate-800/50 border-slate-700 mb-4">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Gem className="h-6 w-6 text-blue-400" />
                  收藏專精
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  專注於發現珍貴物品和收藏價值。學習價值評估、稀有探測等技能，成為收藏界的專家。
                </p>
                <SkillTree skills={skillTrees.collection} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Progress Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-red-900/20 border-red-500">
            <CardContent className="text-center p-4">
              <Target className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">
                {skillTrees.bidding.filter(s => s.learned).length}/{skillTrees.bidding.length}
              </div>
              <div className="text-sm text-gray-400">競標技能</div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-900/20 border-purple-500">
            <CardContent className="text-center p-4">
              <Package className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">
                {skillTrees.items.filter(s => s.learned).length}/{skillTrees.items.length}
              </div>
              <div className="text-sm text-gray-400">道具技能</div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-900/20 border-blue-500">
            <CardContent className="text-center p-4">
              <Gem className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">
                {skillTrees.collection.filter(s => s.learned).length}/{skillTrees.collection.length}
              </div>
              <div className="text-sm text-gray-400">收藏技能</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}