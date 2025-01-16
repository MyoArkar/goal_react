import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './Components/DefaultLayout.jsx';
import GuestLayout from './Components/GuestLayout.jsx';
import Users from './views/users.jsx';
import Goal from './views/goal.jsx';
import GoalDetail from './views/Goal/GoalDetail.jsx';
import Milestone from './views/Milestone.jsx';



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
        path: '/goal',
        element: <Goal />
      },
      {
        path: '/goal/detail',
        element: <GoalDetail />
      },
      {
        path: '/milestone',
        element: <Milestone />
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