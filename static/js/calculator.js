function parseData(data) {
    var rs = []
    var city = data[2].__EMPTY;
    for(var i = 3; i < data.length; i ++) {
        if (data[i].__EMPTY) {
            city = data[i].__EMPTY;
        }
        var itemArr = [];
        if ("商家拓展" == data[i].__EMPTY_2 || "特卖专员" == data[i].__EMPTY_2) {
            itemArr = calForBd(data[i]);
        } else if ("KA销售" == data[i].__EMPTY_2) {
            itemArr = calForKA(data[i]);
        } else {
            continue;
        }
        var total = sum(itemArr);
        var item = [city, data[i].__EMPTY_1, data[i].__EMPTY_2];
        item = item.concat(itemArr);
        item.push(total);
        
        rs.push(toMap(item));
    }
    console.log(rs);
    return rs;
 }

 function toMap(arr) {
     var map = {};
     arr.forEach((item,index,array)=>{
       map[index] = item;
    })
     return map;
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


function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}

function mapToList(map) {
    var arr = [];
    map.forEach(item => {
        var a1 = Object.values(item);
        arr.push(a1);
    });
    return arr;
}

/**
 * 商家拓展
 */
function calForBd(data) {
    return [
        //毛利完成率
        calByRate(data.__EMPTY_8, 0.5, 0.15, 0.15), 
        // "需求成交率": 
        calByRate(data.__EMPTY_20, 0.0, 1.0, 0.15),
        // "新增精准企业数": 
        calByCount(data.__EMPTY_11, 0.01, 0.1),
        // "新增场推需求数": 
        calByCount(data.__EMPTY_15, 0.01, 0.2),
        // "新增KA联系人数": 
        data.__EMPTY_12 > 0 ? 0.1 : 0.0, 
        // "当面拜访": 
        calByCount(data.__EMPTY_10, 0.01, 0.15),
        // "案例回收率": 
        data.__EMPTY_24 < 1 ? 0.0 : 0.05,
        // "Location意向客户数": 
        (data.__EMPTY_25 * 0.1) / 6
    ]
}

/**
 * KA
 */
function calForKA(data) {
    return [
        //毛利完成率
        calByRate(data.__EMPTY_8, 0.5, 0.15, 0.15), 
        // "需求成交率": 
        calByRate(data.__EMPTY_20, 0.0, 0.15, 0.15),
        // "新增精准企业数": 
        calByCount(data.__EMPTY_11, 0.01, 0.05),
        // "新增场推需求数": 
        calByCount(data.__EMPTY_15, 0.01, 0.2),
        // "新增KA联系人数": 
        data.__EMPTY_12 >= 10 ? 0.15 : 0.0,
        // "当面拜访": 
        calByCount(data.__EMPTY_10, 0.01, 0.15),
        // "案例回收率": 
        data.__EMPTY_24 < 1 ? 0.0 : 0.05,
        // "Location意向客户数": 
        (data.__EMPTY_25 * 0.1) / 6
    ]
}