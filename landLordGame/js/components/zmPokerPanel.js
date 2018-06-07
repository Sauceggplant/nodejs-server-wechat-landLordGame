/**
 * Created by zhangmiao on 2018/6/1.
 */
import ZMClass from "../base/zmClass"
import ZMLabel from "./zmLabel"
import ZMButton from "./zmButton"
import ZMColor from "../common/zmColor"

export default class ZMPokerPanel extends ZMClass{
    hidePoker = null;
    density = null;
    toSelectPoker = null;
    pokersModel = null;
    isVertical = false;
    constructor(argP, argWH,isVertical=false, density = 20){
        super(argP, argWH);
        this.isVertical = isVertical;
        this.density = density;
    }
    setPokersModel(model){
        this.pokersModel = model;
        return this;
    }
    beginShow(){
        this.clearControls();
        if(this.pokersModel) {
            var pokers = this.pokersModel.pokers;
            pokers.sort(sortNumber);
            var l = pokers.length;
            for (var i = 0; i < l; i++) {
                var x = 0, y = 0;
                if (this.isVertical) {//竖直展示
                    var h = JMain.pokerSize.height + (l - 1) * this.density;
                    y = (this.size.height - h) / 2 + i * this.density;
                } else {//水平展示
                    var w = JMain.pokerSize.width + (l - 1) * this.density;
                    x = (this.size.width - w) / 2 + i * this.density;
                    if (this.toSelectPoker && pokers[i].isSelected) y = -10;
                }
                pokers[i].setRelativePosition({x: x, y: y});
                pokers[i].isHidePoker = !!this.hidePoker;
            }
            this.addControlInLast(pokers);
        }
        super.beginShow();
        function sortNumber(a, b){
            if(b.pokerNumber==a.pokerNumber) return a.seNumber- b.seNumber;
            else return b.pokerNumber-a.pokerNumber;
        }
    }
}