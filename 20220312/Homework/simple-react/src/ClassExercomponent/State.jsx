import { useState } from 'react';

export function State() {
  const [count, setCount] = useState(0);
  const ref = useRef({
    cache: 1,
  });
  return (
    <div
      onClick={() => {
        alert(ref.current.cache);
      }}>
      {count}
    </div>
  );
}
