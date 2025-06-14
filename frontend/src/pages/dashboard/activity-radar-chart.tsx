import React from 'react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts'

export interface ActivityRadarChartProps {
  data: { type: string; value: number }[]
}

const RADAR_TYPES = ['Weight', 'Cardio', 'Walking', 'Meditation']

export const ActivityRadarChart: React.FC<ActivityRadarChartProps> = ({ data }) => {
  // Ensure all 4 axes are present and clamp values to at least 0.01
  const mergedData = RADAR_TYPES.map(type => {
    const found = data.find(d => d.type === type)
    return { type, value: found ? Math.max(found.value, 0.01) : 0.01 }
  })

  return (
    <div className="w-full aspect-square max-w-xs min-w-[260px] mx-auto p-12">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={mergedData} outerRadius="45%">
          <PolarGrid />
          <PolarAngleAxis
            dataKey="type"
            tick={{ fontSize: 14, fill: '#a3a3a3' }}
            allowDataOverflow={false}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
          <Radar
            name="Activity"
            dataKey="value"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
} 