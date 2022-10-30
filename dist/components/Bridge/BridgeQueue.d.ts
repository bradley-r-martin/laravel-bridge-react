import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { BridgeRegistrationState } from './BridgeRegistration';
import { ControllerReference } from '../Controller/Controller';
export declare enum BridgeQueueActions {
    QUEUE = "QUEUE",
    DISPATCH = "DISPATCH",
    RELEASED = "RELEASED"
}
export declare type Action = {
    type: 'MOUNT' | 'SYNC' | 'FRESH' | 'CALL';
    state: any;
    props: any;
    uuid: string;
    method?: string;
    payload?: any;
};
export interface BridgeQueueAction {
    type: BridgeQueueActions;
    payload: BridgeQueueState;
}
export declare type BridgeQueueState = {
    isDispatched?: boolean;
    resolve: (response: any) => void;
    ref: MutableRefObject<ControllerReference>;
    action: Action;
};
export declare const initial: never[];
export declare function bridgeQueueReducer(state: BridgeQueueState[], action: BridgeQueueAction): BridgeQueueState[];
export declare function hasBridgeQueue(refs: BridgeRegistrationState, setHtmlResponse: Dispatch<SetStateAction<string | undefined>>): [BridgeQueueState[], Dispatch<BridgeQueueAction>];
