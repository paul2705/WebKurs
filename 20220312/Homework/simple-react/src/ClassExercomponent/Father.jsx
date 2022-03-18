import { useState } from 'react';
import { One } from './One';
import { Two } from './Two';

export function Father() {
  const [two, setTwo] = useState(0);
  return (
    <div>
      <One two={two} addTwo={() => setTwo(prev => prev + 1)} />
      <Two two={two} />
    </div>
  );
}
