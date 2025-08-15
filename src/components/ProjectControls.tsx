"use client"

import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProjectControlsProps {
  selectedPackage: 'All' | 'Basic' | 'Advanced'
  onPackageChange: (packageType: 'All' | 'Basic' | 'Advanced') => void
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: 'newest' | 'complex' | 'alphabetical'
  onSortChange: (sort: 'newest' | 'complex' | 'alphabetical') => void
  projectCount: number
}

export function ProjectControls({
  selectedPackage,
  onPackageChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  projectCount
}: ProjectControlsProps) {
  const packageOptions = [
    { value: 'All', label: 'הכל', count: projectCount },
    { value: 'Basic', label: 'בסיסי', count: projectCount },
    { value: 'Advanced', label: 'מתקדם', count: projectCount }
  ]

  const sortOptions = [
    { value: 'newest', label: 'חדש ביותר' },
    { value: 'complex', label: 'מורכבות' },
    { value: 'alphabetical', label: 'אלפביתי' }
  ]

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Package Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">סינון לפי חבילה:</span>
        </div>
        
        <div className="flex bg-gray-100 rounded-2xl p-1">
          {packageOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedPackage === option.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onPackageChange(option.value as 'All' | 'Basic' | 'Advanced')}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedPackage === option.value
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                     <Input
             type="text"
             placeholder="חיפוש לפי שם לקוח, תעשייה או תגיות..."
             value={searchQuery}
             onChange={(e) => onSearchChange(e.target.value)}
             className="pr-10 pl-4 py-3 rounded-2xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white shadow-sm"
             aria-label="חיפוש פרויקטים"
           />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">מיון:</span>
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as 'newest' | 'complex' | 'alphabetical')}>
            <SelectTrigger className="w-48 rounded-2xl border-gray-200 bg-white shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <motion.div
        className="text-sm text-gray-500 text-center sm:text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        נמצאו {projectCount} פרויקט{projectCount !== 1 ? 'ים' : ''}
      </motion.div>
    </motion.div>
  )
}
