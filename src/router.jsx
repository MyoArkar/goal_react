import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import Users from './views/users.jsx';
import Goal from './views/Goal/goal.jsx';
import GoalDetail from './views/Goal/GoalDetail.jsx';
import Milestone from './views/Milestone.jsx';
import Task from './views/Task/Task.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/goals',
        element: <Goal />
      },
      {
        path: '/goal/detail',
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