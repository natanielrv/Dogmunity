import React, { Suspense } from "react";

function Loadable<P extends object>(Component: React.ComponentType<P>) {
  return function LoadableComponent(props: P) {
    return (
      <Suspense>
        <Component {...props} />
      </Suspense>
    );
  };
}

export default Loadable;