import React from 'react';
export default function useBridge<T extends object>(Component: React.ComponentType<T>): {
    (props: T): JSX.Element;
    displayName: string;
};
