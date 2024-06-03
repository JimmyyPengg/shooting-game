import { ScaleType } from "./scale-type";

export class ScaleData {
    scaleType: ScaleType;

    constructor(scaleType: any) {
        this.scaleType = +ScaleType[scaleType];
    }

    static fromJson(rawJson: any): ScaleData {
        let scaleData = new ScaleData(rawJson.scaleType);
        return scaleData;
    }

}