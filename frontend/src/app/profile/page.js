// app/profile/page.js
'use client'; // Add this if using client-side features

import Profile from '@/components/Profile/Profile';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  // Now you can safely use window.location or other browser APIs
  return (
    <div>
      <Profile />
    </div>
  );
}