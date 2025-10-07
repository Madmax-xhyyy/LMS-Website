import { Routes, Route, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import CourseList from './pages/student/CourseList'
import CourseDetails from './pages/student/CourseDetails'
import MyEnrollments from './pages/student/MyEnrollments'
import Player from './pages/student/Player'
import Loading from './components/student/Loading'
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourse'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './components/student/Navbar'
import "quill/dist/quill.snow.css";
import { ToastContainer } from 'react-toastify';

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  UserButton,
} from '@clerk/clerk-react'

const App = () => {
  const isEducatorRoute = useMatch('/educator/*');
  

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      {!isEducatorRoute && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        
        {/* Protected student routes */}
        <Route
          path="/my-enrollments"
          element={
            <SignedIn>
              <MyEnrollments />
            </SignedIn>
          }
        />
        <Route
          path="/player/:courseId"
          element={
            <SignedIn>
              <Player />
            </SignedIn>
          }
        />
        <Route
          path="/loading/:path"
          element={
            <SignedIn>
              <Loading />
            </SignedIn>
          }
        />

        {/* Educator dashboard and nested routes */}
        <Route
          path="/educator"
          element={
            <SignedIn>
              <Educator />
            </SignedIn>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="students-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>

      {/* Auth Buttons (optional position) */}
      <div className="fixed bottom-4 right-4 flex gap-4 z-50">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <SignOutButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default App
