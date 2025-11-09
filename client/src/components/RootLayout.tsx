import { Outlet } from 'react-router';
import NavBar from './navbar/NavBar';

export default function RootLayout() {
  return (
    <>
      <NavBar />

      <Outlet />
    </>
  );
}
