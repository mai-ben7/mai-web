"use client"

import { ReactNode } from 'react'
import styles from './AnimatedButton.module.css'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function AnimatedButton({ children, onClick, className }: AnimatedButtonProps) {
  return (
    <button 
      className={`${styles.animatedButton} ${className || ''}`}
      onClick={onClick}
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