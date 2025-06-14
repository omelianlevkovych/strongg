import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, UserPlus, Trophy } from 'lucide-react'

// Mock data for demonstration
const mockFriends = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    lastActive: '2 hours ago',
    workoutsThisWeek: 4,
    prs: 2
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    lastActive: '5 hours ago',
    workoutsThisWeek: 3,
    prs: 1
  },
  {
    id: 3,
    name: 'Mike Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    lastActive: '1 day ago',
    workoutsThisWeek: 5,
    prs: 3
  }
]

const mockActivity = [
  {
    id: 1,
    user: mockFriends[0],
    type: 'workout',
    details: 'Completed a chest workout',
    time: '2 hours ago'
  },
  {
    id: 2,
    user: mockFriends[1],
    type: 'pr',
    details: 'New PR: Bench Press 225lbs',
    time: '5 hours ago'
  },
  {
    id: 3,
    user: mockFriends[2],
    type: 'workout',
    details: 'Completed a leg workout',
    time: '1 day ago'
  }
]

export default function Friends() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Friends</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search friends..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Friends List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockFriends.map(friend => (
          <div key={friend.id} className="bg-card rounded-lg p-6">
            <div className="flex items-center gap-4">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">{friend.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Last active: {friend.lastActive}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="flex-1 bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Workouts this week</p>
                <p className="text-2xl font-bold mt-1">{friend.workoutsThisWeek}</p>
              </div>
              <div className="flex-1 bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Recent PRs</p>
                <p className="text-2xl font-bold mt-1">{friend.prs}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="bg-card rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
        <div className="space-y-4">
          {mockActivity.map(activity => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 bg-muted rounded-lg"
            >
              <img
                src={activity.user.avatar}
                alt={activity.user.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.user.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm mt-1">{activity.details}</p>
              </div>
              {activity.type === 'pr' && (
                <Trophy className="h-5 w-5 text-yellow-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 