"use client";
import { useEffect, useState } from 'react';
import LogInPage from '@/pages/LogInPage';
import DashboardPage from '@/pages/DashboardPage';
import Cookies from 'js-cookie';
import "./globals.css";
import { UserProvider } from './../utils/UserContext';

export default function Home() {
  return (
    <UserProvider>
      <DashboardPage />
    </UserProvider>
  );
}
