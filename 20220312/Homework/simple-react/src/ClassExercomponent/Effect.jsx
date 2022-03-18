import { useEffect } from 'react';

export function Effect() {
  useEffect(() => {
    const handler = setInterval(() => {
      console.log(`tick${new Date()}`);
    }, 5000);
    return () => {
      clearInterval(handler);
    };
  });
  return <div>effect</div>;
}
