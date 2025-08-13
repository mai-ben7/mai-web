"use client"

import { useEffect, useRef } from 'react'
import styles from './HomeHeroAnimation.module.css'

export function HomeHeroAnimation() {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Trigger animations on mount
    if (containerRef.current) {
      containerRef.current.style.opacity = '1'
      containerRef.current.style.visibility = 'inherit'
    }
  }, [])

  return (
    <span ref={containerRef} className={styles.homeHeroAnimate} style={{ opacity: 0, visibility: 'hidden' }}>
      <span className={styles.a}>
        <span className={styles.clip}>
          <span>A</span>
        </span>
      </span>
      
      <span className={styles.n}>
        <div className={`${styles.homeHeroFlair} ${styles.homeHeroFlairWindmill}`}>
          <svg 
            className={styles.flairSvg}
            viewBox="0 0 137 135" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            aria-hidden="true"
          >
            <path 
              d="M84.1148 67.3453H136.194C136.637 67.3453 137 67.7028 137 68.1397V134.043C137 134.484 136.633 134.845 136.186 134.841C99.0222 134.416 68.9737 104.827 68.502 68.2191V134.206C68.502 134.643 68.1392 135 67.6958 135H0.814284C0.366822 135 -2.06673e-05 134.639 0.00401052 134.198C0.439379 97.2879 30.9354 67.5042 68.498 67.5002H0.806238C0.362807 67.5002 0 67.1427 0 66.7057V0.802561C0 0.361644 0.366822 0.000171863 0.814284 0.00414409C37.9778 0.429172 68.0263 30.0183 68.498 66.6263V0.794617C68.498 0.357672 68.8608 0.000171819 69.3042 0.000171819H136.186C136.633 0.000171819 137 0.361644 136.996 0.802561C136.621 32.4969 114.079 58.94 83.9334 65.7802C83.0022 65.9907 83.1594 67.3453 84.1189 67.3453H84.1148Z" 
              fill="url(#paint0_linear_1655_45397)"
            />
            <path 
              d="M84.1148 67.3453H136.194C136.637 67.3453 137 67.7028 137 68.1397V134.043C137 134.484 136.633 134.845 136.186 134.841C99.0222 134.416 68.9737 104.827 68.502 68.2191V134.206C68.502 134.643 68.1392 135 67.6958 135H0.814284C0.366822 135 -2.06673e-05 134.639 0.00401052 134.198C0.439379 97.2879 30.9354 67.5042 68.498 67.5002H0.806238C0.362807 67.5002 0 67.1427 0 66.7057V0.802561C0 0.361644 0.366822 0.000171863 0.814284 0.00414409C37.9778 0.429172 68.0263 30.0183 68.498 66.6263V0.794617C68.498 0.357672 68.8608 0.000171819 69.3042 0.000171819H136.186C136.633 0.000171819 137 0.361644 136.996 0.802561C136.621 32.4969 114.079 58.94 83.9334 65.7802C83.0022 65.9907 83.1594 67.3453 84.1189 67.3453H84.1148Z" 
              fill="url(#pattern-home-hero-windmill-0)" 
              fillOpacity="0.6" 
              style={{ mixBlendMode: 'multiply' }}
            />
            <defs>
              <pattern 
                id="pattern-home-hero-windmill-0" 
                patternContentUnits="objectBoundingBox" 
                width="1.45985" 
                height="1.48148"
              >
                <rect width="1" height="1" fill="url(#noise)" />
              </pattern>
              <linearGradient 
                id="paint0_linear_1655_45397" 
                x1="-76.6791" 
                y1="-15.6157" 
                x2="165.682" 
                y2="81.0082" 
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.427083" stopColor="#FF8709" />
                <stop offset="0.791667" stopColor="#F7BDF8" />
              </linearGradient>
              <radialGradient id="noise" cx="0" cy="0" r="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        
        <div className={`${styles.homeHeroFlair} ${styles.homeHeroFlairCircles}`}>
          <svg 
            className={styles.flairSvg}
            viewBox="0 0 156 156" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M45.9341 76.316C43.4159 76.8454 40.8068 77.1236 38.1333 77.1236C17.0729 77.1236 0 59.8589 0 38.5618C0 17.2647 17.0729 0 38.1333 0C59.1938 0 76.2666 17.2647 76.2666 38.5618C76.2666 40.3457 76.1469 42.1013 75.915 43.8209H80.0849C79.853 42.1013 79.7332 40.3457 79.7332 38.5618C79.7332 17.2647 96.8061 0 117.867 0C138.927 0 156 17.2647 156 38.5618C156 59.8589 138.927 77.1236 117.867 77.1236C115.499 77.1236 113.182 76.9054 110.934 76.4879V79.5128C113.182 79.0953 115.499 78.8771 117.867 78.8771C138.927 78.8771 156 96.1418 156 117.439C156 138.736 138.927 156.001 117.867 156.001C96.8064 156.001 79.7335 138.736 79.7335 117.439C79.7335 114.736 80.0086 112.097 80.5319 109.551H75.6376C76.0508 111.825 76.2667 114.169 76.2667 116.564C76.2667 137.861 59.1938 155.126 38.1334 155.126C17.0729 155.126 6.30037e-05 137.861 6.30037e-05 116.564C6.30037e-05 95.2671 17.0729 78.0024 38.1334 78.0024C40.8068 78.0024 43.416 78.2806 45.9341 78.8099V76.316Z" 
              fill="url(#paint0_radial_1336_100489)"
            />
            <path 
              fillOpacity=".6" 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M45.9341 76.316C43.4159 76.8454 40.8068 77.1236 38.1333 77.1236C17.0729 77.1236 0 59.8589 0 38.5618C0 17.2647 17.0729 0 38.1333 0C59.1938 0 76.2666 17.2647 76.2666 38.5618C76.2666 40.3457 76.1469 42.1013 75.915 43.8209H80.0849C79.853 42.1013 79.7332 40.3457 79.7332 38.5618C79.7332 17.2647 96.8061 0 117.867 0C138.927 0 156 17.2647 156 38.5618C156 59.8589 138.927 77.1236 117.867 77.1236C115.499 77.1236 113.182 76.9054 110.934 76.4879V79.5128C113.182 79.0953 115.499 78.8771 117.867 78.8771C138.927 78.8771 156 96.1418 156 117.439C156 138.736 138.927 156.001 117.867 156.001C96.8064 156.001 79.7335 138.736 79.7335 117.439C79.7335 114.736 80.0086 112.097 80.5319 109.551H75.6376C76.0508 111.825 76.2667 114.169 76.2667 116.564C76.2667 137.861 59.1938 155.126 38.1334 155.126C17.0729 155.126 6.30037e-05 137.861 6.30037e-05 116.564C6.30037e-05 95.2671 17.0729 78.0024 38.1334 78.0024C40.8068 78.0024 43.416 78.2806 45.9341 78.8099V76.316Z" 
              fill="url(#pattern-home-hero-circles-0)" 
              style={{ mixBlendMode: 'multiply' }}
            />
            <defs>
              <pattern 
                id="pattern-home-hero-circles-0" 
                patternContentUnits="objectBoundingBox" 
                width="0.641025" 
                height="0.641023"
              >
                <rect width="1" height="1" fill="url(#noise2)" />
              </pattern>
              <radialGradient 
                id="paint0_radial_1336_100489" 
                cx="0" 
                cy="0" 
                r="1" 
                gradientUnits="userSpaceOnUse" 
                gradientTransform="translate(48.0022 111.876) rotate(-90) scale(122.883 122.883)"
              >
                <stop stopColor="#E193FF" />
                <stop offset="0.6721" stopColor="#8E78DA" />
                <stop offset="0.7378" stopColor="#937DDB" />
                <stop offset="0.8164" stopColor="#A28BDD" />
                <stop offset="0.9014" stopColor="#BAA3E2" />
                <stop offset="0.9905" stopColor="#DBC3E7" />
                <stop offset="1" stopColor="#DFC7E8" />
              </radialGradient>
              <radialGradient id="noise2" cx="0" cy="0" r="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        
        <span className={styles.clip}>
          <span>
            <span>n</span>
            <span style={{ transform: 'rotateY(180deg)' }}>a</span>
          </span>
        </span>
      </span>
      
      <span className={`${styles.i} ${styles.clip}`}>
        <span>i</span>
      </span>
      
      <span className={`${styles.m} ${styles.clip}`}>
        <span>m</span>
      </span>
      
      <span className={styles.a2}>
        <div className={`${styles.homeHeroFlair} ${styles.homeHeroFlairStar}`}>
          <svg 
            className={styles.flairSvg}
            viewBox="0 0 157 156" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            aria-hidden="true"
          >
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M82.2214 104.04L105.483 143.586C108.242 148.276 114.274 149.852 118.974 147.112V147.112C123.675 144.371 125.275 138.345 122.552 133.634L99.5971 93.9091L144.009 105.424C149.276 106.79 154.656 103.639 156.042 98.3773V98.3773C157.428 93.1154 154.298 87.7233 149.042 86.317L104.72 74.4593L144.266 51.1978C148.957 48.439 150.533 42.407 147.792 37.7062V37.7062C145.052 33.0054 139.026 31.4057 134.314 34.1282L94.5898 57.0835L106.105 12.6719C107.471 7.40463 104.32 2.02469 99.058 0.638673V0.638673C93.7961 -0.747342 88.4041 2.38242 86.9977 7.63895L75.14 51.9603L51.8786 12.4142C49.1197 7.72403 43.0878 6.14763 38.387 8.8883V8.8883C33.6862 11.629 32.0865 17.6548 34.809 22.3662L57.7643 62.0908L13.3526 50.5758C8.08539 49.2101 2.70545 52.3607 1.31944 57.6226V57.6226C-0.0665745 62.8845 3.06319 68.2766 8.31971 69.6829L52.6411 81.5406L13.095 104.802C8.4048 107.561 6.8284 113.593 9.56907 118.294V118.294C12.3097 122.994 18.3356 124.594 23.0469 121.872L62.7716 98.9164L51.2566 143.328C49.8909 148.595 53.0414 153.975 58.3034 155.361V155.361C63.5653 156.747 68.9573 153.617 70.3637 148.361L82.2214 104.04Z" 
              fill="white"
            />
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M82.2214 104.04L105.483 143.586C108.242 148.276 114.274 149.852 118.974 147.112V147.112C123.675 144.371 125.275 138.345 122.552 133.634L99.5971 93.9091L144.009 105.424C149.276 106.79 154.656 103.639 156.042 98.3773V98.3773C157.428 93.1154 154.298 87.7233 149.042 86.317L104.72 74.4593L144.266 51.1978C148.957 48.439 150.533 42.407 147.792 37.7062V37.7062C145.052 33.0054 139.026 31.4057 134.314 34.1282L94.5898 57.0835L106.105 12.6719C107.471 7.40463 104.32 2.02469 99.058 0.638673V0.638673C93.7961 -0.747342 88.4041 2.38242 86.9977 7.63895L75.14 51.9603L51.8786 12.4142C49.1197 7.72403 43.0878 6.14763 38.387 8.8883V8.8883C33.6862 11.629 32.0865 17.6548 34.809 22.3662L57.7643 62.0908L13.3526 50.5758C8.08539 49.2101 2.70545 52.3607 1.31944 57.6226V57.6226C-0.0665745 62.8845 3.06319 68.2766 8.31971 69.6829L52.6411 81.5406L13.095 104.802C8.4048 107.561 6.8284 113.593 9.56907 118.294V118.294C12.3097 122.994 18.3356 124.594 23.0469 121.872L62.7716 98.9164L51.2566 143.328C49.8909 148.595 53.0414 153.975 58.3034 155.361V155.361C63.5653 156.747 68.9573 153.617 70.3637 148.361L82.2214 104.04Z" 
              fill="url(#paint0_radial_1413_80169)"
            />
            <path 
              fillOpacity=".6" 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M82.2214 104.04L105.483 143.586C108.242 148.276 114.274 149.852 118.974 147.112V147.112C123.675 144.371 125.275 138.345 122.552 133.634L99.5971 93.9091L144.009 105.424C149.276 106.79 154.656 103.639 156.042 98.3773V98.3773C157.428 93.1154 154.298 87.7233 149.042 86.317L104.72 74.4593L144.266 51.1978C148.957 48.439 150.533 42.407 147.792 37.7062V37.7062C145.052 33.0054 139.026 31.4057 134.314 34.1282L94.5898 57.0835L106.105 12.6719C107.471 7.40463 104.32 2.02469 99.058 0.638673V0.638673C93.7961 -0.747342 88.4041 2.38242 86.9977 7.63895L75.14 51.9603L51.8786 12.4142C49.1197 7.72403 43.0878 6.14763 38.387 8.8883V8.8883C33.6862 11.629 32.0865 17.6548 34.809 22.3662L57.7643 62.0908L13.3526 50.5758C8.08539 49.2101 2.70545 52.3607 1.31944 57.6226V57.6226C-0.0665745 62.8845 3.06319 68.2766 8.31971 69.6829L52.6411 81.5406L13.095 104.802C8.4048 107.561 6.8284 113.593 9.56907 118.294V118.294C12.3097 122.994 18.3356 124.594 23.0469 121.872L62.7716 98.9164L51.2566 143.328C49.8909 148.595 53.0414 153.975 58.3034 155.361V155.361C63.5653 156.747 68.9573 153.617 70.3637 148.361L82.2214 104.04Z" 
              fill="url(#pattern-home-hero-star-0)" 
              style={{ mixBlendMode: 'multiply' }}
            />
            <defs>
              <pattern 
                id="pattern-home-hero-star-0" 
                patternContentUnits="objectBoundingBox" 
                width="0.625" 
                height="0.625"
              >
                <rect width="1" height="1" fill="url(#noise3)" />
              </pattern>
              <radialGradient 
                id="paint0_radial_1413_80169" 
                cx="0" 
                cy="0" 
                r="1" 
                gradientUnits="userSpaceOnUse" 
                gradientTransform="translate(124.192 87.08) rotate(149.757) scale(126.034)"
              >
                <stop stopColor="#FFEBE7" />
                <stop offset="0.6721" stopColor="#FF9C7C" />
                <stop offset="0.8164" stopColor="#FF9983" />
                <stop offset="0.9014" stopColor="#FF774B" />
                <stop offset="1" stopColor="#E76F00" />
              </radialGradient>
              <radialGradient id="noise3" cx="0" cy="0" r="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        
        <span className={styles.clip}>
          <span>a</span>
        </span>
      </span>
      
      <span className={styles.t}>
        <span className={styles.clip}>
          <span>t</span>
          <span>
            <span style={{ transform: 'translate(0%, -100%)' }}>1</span>
            <span style={{ transform: 'translate(0%, -100%)' }}>0</span>
            <span style={{ transform: 'translate(0%, -100%)' }}>0</span>
          </span>
        </span>
      </span>
      
      <span className={`${styles.e} ${styles.clip}`}>
        <span>e</span>
      </span>
    </span>
  )
} 