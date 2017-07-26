var Song_date = new Date();
var Song = {
    today: getNowDate(),
    todayTime:getTodayTime(),
    todayDayTime:formatDate()  
};

module.exports = Song;

//获取今天日期格式
function getNowDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
       currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
       
    return currentdate;
}
//今天时间
function getTodayTime(){
    var d = new Date();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var hour_ex = "";
    var minute_ex = "";
   
    if (hour < 10) {
        hour_ex = "0";
    }
    if (minute < 10) {
        minute_ex = "0";
    }
    return hour_ex + hour + ":" + minute_ex + minute;   
}
//时间转日期时间
function formatDate() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    var month_ex = "";
    var date_ex = "";
    var hour_ex = "";
    var minute_ex = "";
    var second_ex = "";
    if (month < 10) {
        month_ex = "0";
    }
    if (date < 10) {
        date_ex = "0";
    }
    if (hour < 10) {
        hour_ex = "0";
    }
    if (minute < 10) {
        minute_ex = "0";
    }
    if (second < 10) {
        second_ex = "0";
    }
    return year + "-" + month_ex + month + "-" + date_ex + date + " " + hour_ex + hour + ":" + minute_ex + minute + ":" + second_ex + second;
}










