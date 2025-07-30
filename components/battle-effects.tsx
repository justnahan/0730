"use client"

import { useEffect, useState } from "react"
import { 
  Zap, 
  Shield, 
  Star, 
  Sparkles, 
  Sword, 
  Target,
  Clock,
  Eye,
  Crown,
  Flame
} from "lucide-react"

export interface BattleEffect {
  id: string
  type: 'attack' | 'defense' | 'support' | 'victory' | 'defeat'
  position: { x: number; y: number }
  duration?: number
  itemName?: string
  intensity?: 1 | 2 | 3 | 4 | 5
}

interface BattleEffectsProps {
  effects: BattleEffect[]
  onEffectComplete?: (id: string) => void
}

export function BattleEffects({ effects, onEffectComplete }: BattleEffectsProps) {
  const [activeEffects, setActiveEffects] = useState<BattleEffect[]>([])

  useEffect(() => {
    setActiveEffects(effects)
    
    // Auto-remove effects after duration
    effects.forEach(effect => {
      const duration = effect.duration || 2000
      setTimeout(() => {
        setActiveEffects(prev => prev.filter(e => e.id !== effect.id))
        onEffectComplete?.(effect.id)
      }, duration)
    })
  }, [effects, onEffectComplete])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {activeEffects.map(effect => (
        <BattleEffectComponent key={effect.id} effect={effect} />
      ))}
    </div>
  )
}

function BattleEffectComponent({ effect }: { effect: BattleEffect }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const duration = effect.duration || 2000
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [effect.duration])

  if (!isVisible) return null

  const getEffectIcon = () => {
    switch (effect.type) {
      case 'attack':
        return <Sword className="h-8 w-8 text-red-400" />
      case 'defense':
        return <Shield className="h-8 w-8 text-blue-400" />
      case 'support':
        return <Star className="h-8 w-8 text-green-400" />
      case 'victory':
        return <Crown className="h-12 w-12 text-yellow-400" />
      case 'defeat':
        return <Flame className="h-8 w-8 text-gray-400" />
      default:
        return <Sparkles className="h-8 w-8 text-white" />
    }
  }

  const getEffectClasses = () => {
    const baseClasses = "absolute flex items-center justify-center transition-all duration-1000"
    
    switch (effect.type) {
      case 'attack':
        return `${baseClasses} animate-spin`
      case 'defense':
        return `${baseClasses} animate-pulse`
      case 'support':
        return `${baseClasses} animate-bounce`
      case 'victory':
        return `${baseClasses} animate-pulse`
      case 'defeat':
        return `${baseClasses} animate-ping`
      default:
        return `${baseClasses} animate-pulse`
    }
  }

  const getParticleEffects = () => {
    const particleCount = effect.intensity ? effect.intensity * 2 : 4
    return Array.from({ length: particleCount }, (_, i) => (
      <div
        key={i}
        className={`absolute w-2 h-2 rounded-full animate-ping ${
          effect.type === 'attack' ? 'bg-red-400' :
          effect.type === 'defense' ? 'bg-blue-400' :
          effect.type === 'support' ? 'bg-green-400' :
          effect.type === 'victory' ? 'bg-yellow-400' :
          'bg-gray-400'
        }`}
        style={{
          left: `${20 + (i * 15)}px`,
          top: `${20 + (i * 10)}px`,
          animationDelay: `${i * 0.1}s`,
          animationDuration: '1s'
        }}
      />
    ))
  }

  return (
    <div
      className={getEffectClasses()}
      style={{
        left: effect.position.x,
        top: effect.position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Main Effect Icon */}
      <div className="relative">
        {getEffectIcon()}
        
        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-full blur-md animate-pulse ${
          effect.type === 'attack' ? 'bg-red-400/50' :
          effect.type === 'defense' ? 'bg-blue-400/50' :
          effect.type === 'support' ? 'bg-green-400/50' :
          effect.type === 'victory' ? 'bg-yellow-400/50' :
          'bg-gray-400/50'
        }`} />
      </div>

      {/* Particle Effects */}
      {getParticleEffects()}

      {/* Item Name Display */}
      {effect.itemName && (
        <div
          className="absolute top-12 text-center text-white font-bold text-sm bg-black/50 px-2 py-1 rounded backdrop-blur-sm animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          {effect.itemName}
        </div>
      )}
    </div>
  )
}

// Utility function to create battle effects
export function createBattleEffect(
  type: BattleEffect['type'],
  position: { x: number; y: number },
  options?: {
    itemName?: string
    intensity?: 1 | 2 | 3 | 4 | 5
    duration?: number
  }
): BattleEffect {
  return {
    id: `effect-${Date.now()}-${Math.random()}`,
    type,
    position,
    ...options
  }
}

// Screen shake effect hook
export function useScreenShake() {
  const [isShaking, setIsShaking] = useState(false)

  const shake = (duration = 500) => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), duration)
  }

  useEffect(() => {
    if (isShaking) {
      document.body.style.animation = 'shake 0.1s infinite'
    } else {
      document.body.style.animation = ''
    }

    return () => {
      document.body.style.animation = ''
    }
  }, [isShaking])

  return { isShaking, shake }
}

// Victory celebration component
export function VictoryCelebration({ isVisible, onComplete }: { 
  isVisible: boolean
  onComplete?: () => void 
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete?.()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      {/* Golden Light Rays */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-400/20 via-transparent to-transparent animate-spin-slow" />

      {/* Victory Text */}
      <div className="text-center z-10 animate-bounce-in">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4 animate-pulse">
          勝利！
        </h1>
        
        <p className="text-2xl text-white mb-8 animate-fade-in-delayed">
          恭喜你獲得了這件神器！
        </p>

        {/* Floating rewards */}
        <div className="flex justify-center space-x-8 animate-slide-up">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">+2500 EXP</div>
            <div className="text-sm text-gray-400">經驗值</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">+50 金幣</div>
            <div className="text-sm text-gray-400">戰鬥獎勵</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">稀有道具</div>
            <div className="text-sm text-gray-400">戰利品</div>
          </div>
        </div>
      </div>

      {/* Confetti Effect */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded animate-bounce"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${10 + Math.random() * 20}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  )
}