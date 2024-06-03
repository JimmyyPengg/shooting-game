import { ActionType } from "./action-type";

export class Action {
    actionType: ActionType;
    data: any;

    constructor(actionType: any) {
        this.actionType = +ActionType[actionType];
    }

    static fromJson(rawJson: any): Action {
        let action = new Action(rawJson.actionType);
        action.data = rawJson.data;
        return action;
    }
}