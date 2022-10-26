import React from "react";
export interface ComponentProps {
}
export default function useController<T>(controller: string, Component: React.ComponentType<T>): (props: T) => JSX.Element;
