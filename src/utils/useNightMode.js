import { useEffect } from 'react';

export default function useNightMode() {
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    const isNight = hour >= 22 || hour < 6;

    if (isNight) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }
  }, []);
}
