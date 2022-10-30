import React from 'react';
export default function useController<T extends object>(controller: string, Component: React.ComponentType<T>): {
    (props: T): JSX.Element;
    displayName: string;
};
