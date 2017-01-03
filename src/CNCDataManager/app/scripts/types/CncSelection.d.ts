﻿/**SideMenu Type Definition */
interface IObjectState {
    IsSelected: boolean;
    IsShown: boolean;
    [prop: string]: any;
}

interface ISelectionOject extends IObjectState {
    TypeID: string;
    Manufacturer?: string;
    SupportType?: string;
    ImgUrl?: string,
    [prop: string]: any;
}

interface ISelectionAxis extends IObjectState {
    Guide: ISelectionOject;
    ScrewNuts: ISelectionOject;
    Bearings: ISelectionOject;
    Couplings: ISelectionOject;
    ServoMotor: ISelectionOject;
    ServoDriver: ISelectionOject;
    [prop: string]: any;
}

interface ISelectionData {
    CNCMachine: ISelectionOject;
    CNCSystem: ISelectionOject;
    FeedSystemX: ISelectionAxis;
    FeedSystemY: ISelectionAxis;
    FeedSystemZ: ISelectionAxis;
    Spindle?: ISelectionAxis;
    [prop: string]: any;
}

interface ISelectionStateScope extends angular.IScope {
    data: ISelectionData;
    changeHandler: () => void;
}

/** Selection Controllers' Type Definition */
interface ISelectionPartScope extends angular.IScope {
    nextStep: () => void;
    reset: () => void;
}

import { IItem, ITableScope } from './CncData';
interface ISelectionTableScope extends ITableScope, ISelectionPartScope {
    ITEMNAME: string;
    items: IItem[];
    state: {
        orderProperty: string;
        paginationIndex: number;
        paginationSize: number;
        colState?: boolean[];
    };
    data: {
        selectedTypeID: string;
    };
    changeOrderProperty: (property: string) => void;
    selectItem: (item: IItem) => void;
    toggleCol?: (id: number, e: BaseJQueryEventObject) => void;
}

interface ISelectionTableHandler {
    toggleCol: (id: number, e: BaseJQueryEventObject)=> void;
    changeOrderProperty: (property: string)=> void
}

/** PageBy Filter Type Definition */
interface IFilterPageBy{
    (items: any[], paginationIndex: number, paginationSize: number): any[];
}

/** CNCSystem Selection Type */
interface ICNCSystemFilterConditions {
    Manufacturer: string;
    SupportChannels: number;
    MaxNumberOfFeedShafts: number;
    SupportMachineType: string;
}
interface IFilterCNCSystemFiltrate {
    (items: any[], conditions: ICNCSystemFilterConditions): any[];
}

interface ICNCSystemSelectionScope extends ISelectionTableScope {
    state: {
        filtrateConditions: ICNCSystemFilterConditions;
        orderProperty: string;
        paginationIndex: number;
        paginationSize: number;
        colState?: boolean[];
    };
}

export { ISelectionAxis };
export { ISelectionData };
export { ISelectionStateScope };
export { ISelectionPartScope };
export { ISelectionTableScope };
export { ISelectionTableHandler };
export { IFilterPageBy };
export { ICNCSystemFilterConditions };
export { IFilterCNCSystemFiltrate };
export { ICNCSystemSelectionScope };