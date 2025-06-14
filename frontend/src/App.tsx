import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import Layout from '@/components/layout'
import Dashboard from '@/pages/dashboard'
import Statistics from '@/pages/statistics'
import Friends from '@/pages/friends'
import Settings from '@/pages/settings'
import WorkoutCreator from '@/pages/workout-creator'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="strongg-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/workout-creator" element={<WorkoutCreator />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
  )
}

export default App
