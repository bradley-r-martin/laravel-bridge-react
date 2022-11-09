import React, { Dispatch, FunctionComponent } from 'react';
import { ControllerDataAction, ControllerDataState } from './ControllerData';
import { ControllerExceptionsAction } from './ControllerExceptions';
import { ControllerStatusAction } from './ControllerStatus';
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
    dispatchExceptions: Dispatch<ControllerExceptionsAction>;
}
declare const Controller: FunctionComponent<ControllerProps>;
export default Controller;
