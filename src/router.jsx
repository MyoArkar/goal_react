import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import ErrorBoundary from './Components/ErrorBoundary.jsx';
import Users from './views/users.jsx';
import Goal from './views/Goal/goal.jsx';
import GoalDetail from './views/Goal/GoalDetail.jsx';
import Milestone from './views/Milestone.jsx';
import Task from './views/Task/Task.jsx';
import Progress from './views/User/Progress.jsx';
import Profile from './views/User/Profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/progress',
        element: <Progress />
      },
      {
        path: '/goals',
        element: <Goal />
      },
      {
        path: '/goals/:id',
        element: <GoalDetail />
      },
      {
        path: '/milestones',
        element: <Milestone />
      },
      {
        path: '/tasks',
        element: <Task />
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />,
      }
    ]
  }
]);

export default router;