import React,{ useEffect } from 'react';
import { Slot, useSegments, useRouter } from "expo-router";
import { AuthContextProvider, useAuth } from '../context/authContext';
import "../global.css"
const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return;

    const inApp = segments[0] === '(app)';

    if (isAuthenticated && !inApp) {
      router.replace('/home');
    } else if (isAuthenticated === false) {
      router.replace('/signIn');
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
