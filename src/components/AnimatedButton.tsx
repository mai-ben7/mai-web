"use client"

import { ReactNode, CSSProperties } from 'react'
import styles from './AnimatedButton.module.css'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  style?: CSSProperties
}

export function AnimatedButton({ children, onClick, className, style }: AnimatedButtonProps) {
  return (
    <button 
      className={`${styles.animatedButton} ${className || ''}`}
      onClick={onClick}
      style={style}
      suppressHydrationWarning
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {children}
    </button>
  )
} 