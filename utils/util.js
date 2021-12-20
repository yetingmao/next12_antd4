
const Util = {
    initTableHeight: (father, brothers, more) => {
        const _f = father.clientHeight;
        const _bs = brothers.reduce(function (sum, number) { //sum2 前两个数的和
            return sum + number.clientHeight;
        }, 0)
        return _f - _bs - more;
    },
    SetConfig: (key, value) => {
        global[key] = value;
        console.log("setConfig----------》", key, value)
    },
    GetConfig: (key) => {
        return global[key];
    }

}

export default Util