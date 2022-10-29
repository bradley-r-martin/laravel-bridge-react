import { ControllerDataAction, ControllerDataState } from './ControllerData';
import { ControllerStatusAction } from './ControllerStatus';
import React, { Dispatch, FunctionComponent } from 'react';
interface ControllerProps {
    controller: string;
    children?: React.ReactNode;
}
export interface ControllerReference {
    uuid: string;
    props: any;
    data: ControllerDataState;
    dispatchData: Dispatch<ControllerDataAction>;
    dispatchStatus: Dispatch<ControllerStatusAction>;
}
declare const Controller: FunctionComponent<ControllerProps>;
export default Controller;
