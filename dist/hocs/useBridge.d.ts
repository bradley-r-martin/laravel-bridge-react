import React from 'react';
export default function useBridge<T>(Component: React.ComponentType<T>): (props: T) => JSX.Element;
