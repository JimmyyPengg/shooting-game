export class OrientationData {
    rotateDegrees: number = 0;
    leftToRight: number = 0;
    frontToBack: number = 0;

    static fromJson(rawJson: any): OrientationData {
        let orientationData = new OrientationData();
        orientationData.rotateDegrees = rawJson.rotateDegrees;
        orientationData.leftToRight = rawJson.leftToRight;
        orientationData.frontToBack = rawJson.frontToBack;
        return orientationData;
    }

    toRest() {
        return {
            rotateDegrees: this.rotateDegrees,
            leftToRight: this.leftToRight,
            frontToBack: this.frontToBack
        }
    }
}