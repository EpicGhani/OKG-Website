import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Layout } from './pages/Layout'
import { Home } from './pages/Home'
import { DevlogPage } from './pages/DevlogPage'
import { DevlogEntryPage } from './pages/DevlogEntryPage'
import { AdminLayout } from './pages/admin/AdminLayout'
import { Dashboard } from './pages/admin/Dashboard'
import { AdminDevlogs } from './pages/admin/AdminDevlogs'
import { NewDevlog } from './pages/admin/NewDevlog'
import { EditDevlog } from './pages/admin/EditDevlog'
import { AdminMedia } from './pages/admin/AdminMedia'
import { Login } from './pages/admin/Login'
import { RequireAuth } from './pages/admin/RequireAuth'
import { GamesPage } from './pages/GamesPage'
import { GameDetailPage } from './pages/GameDetailPage'
import { AdminGames } from './pages/admin/AdminGames'
import { NewGame } from './pages/admin/NewGame'
import { EditGame } from './pages/admin/EditGame'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/devlog" element={<DevlogPage />} />
        <Route path="/devlog/:slug" element={<DevlogEntryPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:slug" element={<GameDetailPage />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="devlogs" element={<AdminDevlogs />} />
        <Route path="devlogs/new" element={<NewDevlog />} />
        <Route path="devlogs/:slug/edit" element={<EditDevlog />} />
        <Route path="media" element={<AdminMedia />} />
        <Route path="games" element={<AdminGames />} />
        <Route path="games/new" element={<NewGame />} />
        <Route path="games/:slug/edit" element={<EditGame />} />
      </Route>
    </>,
  ),
)

export default function App() {
  return <RouterProvider router={router} />
}