function parseData(data, callBack) {
    var rs = []
    for(var i = 3; i < data.length; i ++) {
        if ("商家拓展" != data[i].__EMPTY_2) {
            continue;
        }
        var itemArr = [
            //毛利完成率
            calByRate(data[i].__EMPTY_8, 0.5, 0.15, 0.15), 
            // "需求成交率": 
            calByRate(data[i].__EMPTY_20, 0.0, 1.0, 0.15),
            // "新增精准企业数": 
            calByCount(data[i].__EMPTY_11, 0.01, 0.1),
            // "新增场推需求数": 
            calByCount(data[i].__EMPTY_15, 0.01, 0.2),
            // "新增KA联系人数": 
            data[i].__EMPTY_12 > 0 ? 0.1 : 0.0, 
            // "当面拜访": 
            calByCount(data[i].__EMPTY_10, 0.01, 0.15),
            // "案例回收率": 
            data[i].__EMPTY_24 < 1 ? 0.0 : 0.05,
            // "Location意向客户数": 
            (data[i].__EMPTY_25 * 0.1) / 6
        ]
        total = sum(itemArr)
        var item = [data[i].__EMPTY_1]
        item = item.concat(itemArr)
        item.push(total)
        rs.push(item)
    }
    callBack(rs);
 }

 function calByRate(rate, lowThreshold, priority, max) {
     if (typeof(rate) != "number") {
         return 0.0;
     }
     if (lowThreshold > 0.0 && rate < lowThreshold) {
         return 0.0;
     }
     var score = rate * priority;
     if (max > 0.0 && score > max) {
         score = max;
     }
     return score;
 }

 function calByCount(count, priority, max) {
     var score = count * priority;
     if (max > 0.0 && score > max) {
        score = max;
    }
    return score;
 }

function sum(arr) {
    var s = 0;
    arr.forEach(function(val, idx, arr) {
        s += val;
    }, 0);

    return s;
}
