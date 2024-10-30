import React, { Suspense, useEffect, useState } from 'react';
import BoxRevealDemo from './MagicUiDesign/BoxRevealDemo';

const AsyncComponent: React.FC<{ loader: () => Promise<React.ReactElement> }> = ({ loader }) => {
  const [Component, setComponent] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    loader().then(setComponent);
  }, [loader]);

  if (!Component) return null;

  return Component;
};

export default function BoxRevealWrapper() {
  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncComponent loader={BoxRevealDemo} />
      </Suspense>
    </div>
  );
}