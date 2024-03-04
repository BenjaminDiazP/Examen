/*navegar entre componentes
por medio de URL*/
import React, { useContext } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import SignInPage from '../modules/auth/SignInPage';
import AuthContext from '../config/context/auth-context';
import AdminLayout from '../components/layout/AdminLayout';
import PageError404 from '../components/pages/PageError404';
import UserLayout from '../components/layout/UserLayout';
import ClientLayout from '../components/layout/ClientLayout';
import CocineroLayout from '../components/layout/CocineroLayout';
import AdminHome from '../components/pages/admin/AdminHome';
import ClientHome from '../components/pages/client/ClientHome';
import UserHome from '../components/pages/user/UserHome';
import CocineroHome from '../components/pages/cocinero/CocineroHome';

const AppRouter = () => {

  const { user } = useContext(AuthContext);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {user.signed ? (
          <>
            {user.roles[0].name === 'ADMIN_ROLE' && (
              <Route path="/" element={<AdminLayout />}>
                <Route path="admin" element={<AdminHome/>} />
              </Route>
            )}
            {user.roles[0].name === 'CLIENT_ROLE' && (
              <Route path="/" element={<ClientLayout />}>
                <Route path="client" element={<ClientHome/>} />
              </Route>
            )}
            {user.roles[0].name === 'USER_ROLE' && (
              <Route path="/" element={<UserLayout />}>
                <Route path="user" element={<UserHome/>} />
              </Route>
            )}
            {user.roles[0].name === 'COCINERO_ROLE' && (
                <Route path="/" element={<CocineroLayout />}>
                  <Route path="cocinero" element={<CocineroHome/>} />
                </Route>
            )}
          </>
        ) : (
          <Route path="/" element={<SignInPage />} />
        )}
        <Route path="/*" element={<PageError404/>} />
      </>
    )
  );
  //RouterProvider -> Context
  return <RouterProvider router={router} />;
};
export default AppRouter;
