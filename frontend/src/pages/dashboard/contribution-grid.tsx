import { format, addDays, subDays, startOfWeek, isSameDay, isToday } from 'date-fns'
import React, { useRef, useEffect } from 'react'

export type ContributionDay = {
  date: Date
  count: number
}

export interface ContributionGridProps {
  data: ContributionDay[]
  onDayClick?: (date: Date) => void
  selectedDate?: Date
  cellSize?: number
  showLegend?: boolean
  prDays?: string[] // yyyy-MM-dd
}

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const weekCount = 53
const dayCount = 7

function getMonthLabels(startDate: Date): { label: string, col: number }[] {
  const labels: { label: string, col: number }[] = []
  let lastMonth = -1
  for (let week = 0; week < weekCount; week++) {
    const firstDayOfWeek = addDays(startOfWeek(startDate, { weekStartsOn: 1 }), week * 7)
    const month = firstDayOfWeek.getMonth()
    if (month !== lastMonth) {
      labels.push({ label: format(firstDayOfWeek, 'MMM'), col: week })
      lastMonth = month
    }
  }
  return labels
}

function getColor(count: number, max: number): string {
  if (count === 0) return 'bg-muted border border-border'
  if (count < max * 0.25) return 'bg-green-900'
  if (count < max * 0.5) return 'bg-green-700'
  if (count < max * 0.75) return 'bg-green-500'
  return 'bg-green-300'
}

export const ContributionGrid: React.FC<ContributionGridProps> = ({ data, onDayClick, selectedDate, cellSize = 10, showLegend = true, prDays = [] }) => {
  const today = new Date()
  const startDate = subDays(today, 364)
  const dataMap = new Map(data.map(d => [format(d.date, 'yyyy-MM-dd'), d.count]))
  const maxCount = Math.max(1, ...data.map(d => d.count))
  const prSet = new Set(prDays)

  const grid: (ContributionDay | null)[][] = Array.from({ length: dayCount }, (_, day) =>
    Array.from({ length: weekCount }, (_, week) => {
      const date = addDays(startOfWeek(startDate, { weekStartsOn: 1 }), week * 7 + day)
      if (date < startDate || date > today) return null
      return {
        date,
        count: dataMap.get(format(date, 'yyyy-MM-dd')) || 0
      }
    })
  )

  const monthLabels = getMonthLabels(startDate)

  // Fixed width for grid and legend
  const gridWidth = weekCount * (cellSize + 2)
  const gridHeight = dayCount * (cellSize + 2)

  const todayRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' })
      todayRef.current.focus()
    }
  }, [])

  return (
    <div className="flex flex-col items-start" style={{ width: gridWidth + 40 }}>
      <div className="relative" style={{ width: gridWidth, height: 16 }}>
        <div className="absolute left-[40px] top-0 flex" style={{ width: gridWidth }}>
          {monthLabels.map(({ label, col }, idx) => (
            <div
              key={label + idx}
              style={{ width: (cellSize + 2) * (monthLabels[idx + 1]?.col ? monthLabels[idx + 1].col - col : weekCount - col), minWidth: 0 }}
              className="text-[9px] text-foreground text-center"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row items-start" style={{ width: gridWidth + 40 }}>
        <div className="flex flex-col select-none" style={{ width: 40 }}>
          {dayLabels.map(label => (
            <div
              key={label}
              className="text-[9px] text-foreground flex items-center justify-end pr-1"
              style={{ height: cellSize + 2, minHeight: cellSize + 2 }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${weekCount}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${dayCount}, ${cellSize}px)`,
            gap: '2px',
            width: gridWidth,
            height: gridHeight
          }}
        >
          {grid.map((row, dayIdx) =>
            row.map((cell, weekIdx) => {
              const dateStr = cell ? format(cell.date, 'yyyy-MM-dd') : ''
              const isPR = prSet.has(dateStr)
              const isTodayCell = cell && isToday(cell.date)
              return (
                <button
                  key={weekIdx + '-' + dayIdx}
                  ref={isTodayCell ? todayRef : undefined}
                  className={`rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${cell ? (isPR ? 'bg-red-600 border-red-700' : getColor(cell.count, maxCount)) : 'bg-transparent'} ${cell && selectedDate && isSameDay(cell.date, selectedDate) ? 'ring-2 ring-primary ring-offset-2' : ''} ${isTodayCell ? 'border-primary' : ''}`}
                  title={cell ? `${format(cell.date, 'yyyy-MM-dd')}: ${cell.count} workouts${isPR ? ' (PR!)' : ''}` : ''}
                  aria-label={cell ? `${format(cell.date, 'EEEE, MMM d, yyyy')}: ${cell.count} workouts${isPR ? ' (PR!)' : ''}` : ''}
                  onClick={() => cell && onDayClick?.(cell.date)}
                  disabled={!cell}
                  tabIndex={cell ? 0 : -1}
                  style={{ width: cellSize, height: cellSize, minWidth: cellSize, minHeight: cellSize, maxWidth: cellSize, maxHeight: cellSize }}
                />
              )
            })
          )}
        </div>
      </div>
      {showLegend && (
        <div className="flex items-center gap-1 mt-2 ml-[40px]" style={{ width: gridWidth }}>
          <span className="text-[9px] text-foreground">Less</span>
          <span className="w-3 h-3 rounded-sm bg-muted border border-border" />
          <span className="w-3 h-3 rounded-sm bg-green-900" />
          <span className="w-3 h-3 rounded-sm bg-green-700" />
          <span className="w-3 h-3 rounded-sm bg-green-500" />
          <span className="w-3 h-3 rounded-sm bg-green-300" />
          <span className="w-3 h-3 rounded-sm bg-red-600 border-red-700" title="Personal Record (PR)" />
          <span className="text-[9px] text-foreground">More</span>
        </div>
      )}
    </div>
  )
} 