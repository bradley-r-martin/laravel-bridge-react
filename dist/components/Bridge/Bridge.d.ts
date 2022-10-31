import React, { FunctionComponent } from 'react';
interface BridgeProps {
    children: React.ReactNode;
    onRedirect?: (location: string) => void;
}
declare const Bridge: FunctionComponent<BridgeProps>;
export default Bridge;
