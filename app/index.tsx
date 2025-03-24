// app/index.tsx
import { useRouter, useNavigationContainerRef } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function Index() {
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!hasRedirected.current) {
      hasRedirected.current = true;
      setTimeout(() => {
        router.replace('/login');
      }, 0);
    }
  }, []);

  return null;
}
