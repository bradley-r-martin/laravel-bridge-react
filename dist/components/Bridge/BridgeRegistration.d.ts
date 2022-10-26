import { MutableRefObject } from "react";
import { ControllerReference } from "../Controller/Controller";
export declare enum BridgeRegistrationActions {
    REGISTERING = "REGISTERING",
    REGISTERED = "REGISTERED",
    DEREGISTERING = "DEREGISTERING",
    DEREGISTERED = "DEREGISTERED"
}
export interface BridgeRegistrationAction {
    type: BridgeRegistrationActions;
    ref: MutableRefObject<ControllerReference>;
}
export declare type BridgeRegistrationState = MutableRefObject<ControllerReference>[];
export declare const initial: never[];
export declare function bridgeRegistrationReducer(state: BridgeRegistrationState, action: BridgeRegistrationAction): BridgeRegistrationState;
export declare function hasBridgeRegistration(): [BridgeRegistrationState, import("react").Dispatch<BridgeRegistrationAction>];
