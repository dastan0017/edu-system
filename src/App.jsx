import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './hooks'
import { SignIn, Page404 } from 'pages'
import { Layout } from './views/Layout'
import { PublicLayout } from './views/PublicLayout'
import { getLocalStorage } from './utils/utils'
import { observer } from 'mobx-react'
import { Spinner } from 'react-bootstrap'

const VideoLessons = lazy(() => import('./views/Public/pages/VideoLessons'))
const AdminsVideoLessons = lazy(() => import('./views/Admin/pages/VideoLessons'))

const Quizzes = lazy(() => import('./views/Public/pages/Quizzes'))
const SingleQuiz = lazy(() => import('./views/Public/pages/Quizzes/SingleQuiz'))

const App = observer(() => {
  const authStore = useStore('authStore')

  if (!authStore.isAuth && !getLocalStorage('authStore')?._isAuth)
    return (
      <Routes>
        <Route path="signin" name="Sign In" element={<SignIn />} />
        <Route path="/" element={<PublicLayout />}>
          <Route index path="/" element={<h2>HOME PAGE</h2>} />
          <Route
            index
            path="video-lessons"
            element={
              <Suspense fallback={<Spinner />}>
                <VideoLessons />
              </Suspense>
            }
          />
          <Route
            index
            path="quizzes/*"
            element={
              <Suspense fallback={<Spinner />}>
                <Quizzes />
              </Suspense>
            }
          />
          <Route
            index
            path="quizzes/:quizId"
            element={
              <Suspense fallback={<Spinner />}>
                <SingleQuiz />
              </Suspense>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="signin" name="Sign In" element={<SignIn />} />
          <Route path="unauthorized" element={<div>You have not access to view this page</div>} />

          <Route index path="/" element={<div>MAIN PAGE</div>} />

          <Route
            index
            path="video-lessons"
            element={
              <Suspense fallback={<Spinner />}>
                <AdminsVideoLessons />
              </Suspense>
            }
          />

          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  )
})

export default App
