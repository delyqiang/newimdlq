import axios from 'axios';
import Promise from 'promise-polyfill';
import {DomainUrl} from '../api';
import Router from '../router/index.js'
import { Message,Spin } from 'iview';
const $Message = Message;
const $Spin = Spin;
var messageorrespmsg,timertime;
// var usertoken = GetQueryString('cookieUserToken') == null ? getCookie('cookieUserToken') : '';
if (!window.Promise) {
  window.Promise = Promise;
}
//js数组初始化——ES6 Array.prototype.fill()用给定值填充数组
if (!Array.prototype.fill) {
  fillPolyfill()
}

/**
 * 拦截器
 */
function processUserToken() {
  axios.defaults.withCredentials = true;
  // axios.defaults.timeout = 6000;
  axios.interceptors.request.use(function (request) {
    let usertoken = sessionStorage.getItem('ld_Token')==null ? '': sessionStorage.getItem('ld_Token') ;
    let appId = sessionStorage.getItem('appId')==null ? '': sessionStorage.getItem('appId') ;
    request.headers.Authorization = 'Bearer ' + usertoken;
    request.headers.appId = appId;
    return request;
  }, function (error) {
  });

  axios.interceptors.response.use(function (response) {
    if (response.data.state !== 1) {
      if (response.data.state === 306) {
        Router.replace({name:'Index'});
        sessionStorage.clear();
        let now = +new Date();
        if (messageorrespmsg && now - messageorrespmsg < 3000) {
            clearTimeout(timertime);
            timertime = setTimeout(() => {
                messageorrespmsg = now;
            }, 3000);
        } else {
            messageorrespmsg = now;
            $Message.error('登录超时，请重新登录！');
        }
      }else{
        if(response.data.message){
          $Message.error(response.data.message);
        }else{
          if(response.data.respmsg){
            $Message.error(response.data.respmsg);
          }else{
            console.log(response);
          }
        }
      }


    }
    return response;
  }, function (error) {
  });

}

processUserToken();

/**
 * 获取地址栏参数
 * @param name 可用
 * @returns {*} value
 */

//获取地址栏参数//只能是英文参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
  //if (r != null) return decodeURIComponent(r[2]); return null;
}
//获取地址栏参数//可以是中文参数
function getUrlParam(key) {
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}

function GetIframeQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var ifr = parent.document.getElementById("ifContent");
  var r;
  if (ifr == null) {
    return null;
  } else {
    r = parent.window.document.getElementById("ifContent").contentWindow.location.search.substr(1).match(reg);
  }
  if (r != null) return unescape(r[2]);
  return null;
  //if (r != null) return decodeURIComponent(r[2]); return null;
}

function GetRootPath() {
  var curWwwPath = window.document.location.href;
  var pathName = window.document.location.pathname;
  var pos = curWwwPath.indexOf(pathName);

  var localhostPaht = curWwwPath.substring(0, pos);

  var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
  return (localhostPaht + projectName);
}
//ES6中新添加的Array.prototype.fill向前兼容方案
function fillPolyfill() {
  if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
      value: function (value) {

        // Steps 1-2.
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }

        var O = Object(this);

        // Steps 3-5.
        var len = O.length >>> 0;

        // Steps 6-7.
        var start = arguments[1];
        var relativeStart = start >> 0;

        // Step 8.
        var k = relativeStart < 0 ?
          Math.max(len + relativeStart, 0) :
          Math.min(relativeStart, len);

        // Steps 9-10.
        var end = arguments[2];
        var relativeEnd = end === undefined ?
          len : end >> 0;

        // Step 11.
        var final = relativeEnd < 0 ?
          Math.max(len + relativeEnd, 0) :
          Math.min(relativeEnd, len);

        // Step 12.
        while (k < final) {
          O[k] = value;
          k++;
        }

        // Step 13.
        return O;
      }
    });
  }
}

/**
 * 设置cookie 值
 * @param name  key
 * @returns value value
 */
// function setCookie(name, value) {
  // var exp = new Date(Date.parse(timeStr));
//   document.cookie = name + "=" + escape(value) + ";expires=" + new Date().toLocaleString();
// }
function setCookie(c_name,value,expiredays){
  // c_name--cookie的name-key值
  // value--cookie的value值
  // expiredays--cookie的过期时间
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+';Path=/;'
}

/**
 * 获取cookie 值
 * @param c_name  key
 * @returns value
 */
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return null;
}

/**
 * Get请求方法添加添加时间戳
 * @param url 完整url接口
 * @param params 需要传递的参数
 * @returns {AxiosPromise<any>}
 */

function getData(url, params) {
  let nowTimestamp = new Date().getTime(); //时间戳，防止加载缓存
  if (typeof (params) == "object") {
    params["timestamp"] = nowTimestamp;
  } else {
    params = {
      timestamp: nowTimestamp
    };
  }
  var httpInput = {
    params: params
  };
  return axios.get(url, httpInput);
}

/**
 * Post请求方法添加添加时间戳
 * @param url 完整url接口
 * @param params 需要传递的参数
 * @returns {AxiosPromise<any>}
 */

const postData = function postData(url, params) {
  let nowTimestamp = new Date().getTime();
  if (typeof (params) == "object") {
    params["timestamp"] = nowTimestamp;
  } else {
    params = {
      timestamp: nowTimestamp
    };
  }
  return axios.post(url, params);
}
function putData(url, params) {
  let nowTimestamp = new Date().getTime(); //时间戳，防止加载缓存
  if (typeof (params) == "object") {
    // params["timestamp"] = nowTimestamp;
  } else {
    // params = {
    //   // timestamp: nowTimestamp
    // };
  }
  let httpInput = params;
  return axios.put(url, httpInput);
}
function deleteData(url, params) {
  let nowTimestamp = new Date().getTime(); //时间戳，防止加载缓存
  if (typeof (params) == "object") {
    // params["timestamp"] = nowTimestamp;
  } else {
    // params = {
    //   // timestamp: nowTimestamp
    // };
  }
  let httpInput = params;
  return axios.delete(url, httpInput);
}

/**,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
 * 判断localstorage是否可用
 * @return true 可用, false 不可用
 * @returns {boolean}
 */

function isLocalStorageSupported() {
  let testKey = 'test',
    storage = window.sessionStorage;
  try {
    storage.setItem(testKey, 'testValue');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 判断是否是PC端
 * @return ture 为PC false 为移动端
 * @constructor
 */
function IsPc() {
  let ua = window.navigator.userAgent,
    agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod'],
    flag = true;
  for (let i = 0, len = agents.length; i < len; i++) {
    if (ua.indexOf(agents[i]) > 0) {
      flag = false;
      break;
    }
  }
}

/**
 * @param date 日期
 * @param fmt  需要格式化的形式
 * @returns {*}
 *  将 Date 转化为指定格式的String
 *  月(M)、日(d)、小时(h)、分(m)、秒(s) 可以用 1-2 个占位符
 *  年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *  eg：
 *  DateFormat(new Date(), "yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *  DateFormat(new Date(), "yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
function DateFormat(date, fmt) {
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

//日期转化为时间戳
function str2Time(str) {
  str = str.replace(/-/g, '/'); // 将-替换成
  var date = new Date(str); // 构造一个日期型数据，值为传入的字符串
  var time = date.getTime();
  // console.log(time)
  return time
}

/**
 * 四舍五入
 * @param number 需要处理的数字
 * @param digits 小数位数
 */
function toFixed(number, digits) {
  if (number === "") {
    return "";
  }
  if (isNaN(number)) {
    return number;
  }
  var object = new Number(number);
  var result = object.toFixed(digits);

  if (result == "-0.00") { // 解决部分负数保留两位小数后，-0.00，0.00 页面样式不一致问题，如 -0.0000012
    result = "0.00";
  }

  return result;
};

/**
 * 获取当前日期
 * yyyyMMdd
 */
function getTodayFormatDate(type = '-') {
  var date = new Date();
  // var seperator1 = "";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + type + month + type + strDate;
  return currentdate;
};

// 2018-4-11 11:38:47
/**
 * 获取当前时分秒，补0
 * HHmmss
 * @arg 分割方式 default "-"
 */
function getTodayFormatTime(type = ':') {
  var date = new Date();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (second < 10) {
    second = "0" + second;
  }

  var currentTime = hour + type + minute + type + second + "";
  return currentTime;
};

/**
 * 判断是否为空
 * @method isEmpty
 * @param  val
 * @return {boolean}
 */
function isEmpty(val) {
  return val === null || val === undefined || val === '' || val.length === 0 || JSON.stringify(val) === '{}'
}

/**
 * 对象属性的深拷贝
 */
function extendObject(initalObj, finalObj) {
  if (isEmpty(finalObj)) {
    return initalObj
  } else {
    for (let i in initalObj) {
      if (finalObj[i] === undefined) {
        finalObj[i] = initalObj[i]
      } else if (typeof initalObj[i] === 'object') {
        extendObject(initalObj[i], finalObj[i])
      }
    }
    return finalObj
  }
}

/**
 * @param obj
 * @returns {boolean}
 */
function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

/**
 * 判断浏览器
 * @returns :
 *  others => 不是IE
 *  'edge' => Edge
 *  7~11   => IE7 ~ IE 11
 */

function IEVersion() {
  var userAgent = navigator.userAgent;
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6;//IE版本<=7
    }
  } else if (isEdge) {
    return 'edge';// edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return 'others';//不是ie浏览器
  }
}

/**********截取字符串****/
function processlikeDateStr(str) {
  if (typeof str !== 'string' || str == null) {
    return '---'
  }
  var temp = str;
  str = str.substr(0, str.indexOf(" "));
  str = str.trim().replace(/\/|-/g, '-');
  str = str.split('-');
  if (Array.isArray(str) && str.length > 2) {
    if (str[1].length === 1) {
      str[1] = '0' + str[1]
    }
    if (str[2].length === 1) {
      str[2] = '0' + str[2]
    }
  } else {
    return temp
  }
  return str.toString().replace(/\,/g, '-')
}

/********** 特殊字符转义****/
function escapeHtml(string) {
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

// 处理有效值
/**
 * 如果传入的非有效值 输出空字符串
 * @param value
 */
function processEffectiveValue(value) {
  if (value) {
    return value
  } else {
    return ''
  }
}
/***斜杆转横杆***/
function slash2Mid(str) {
  if (typeof str === "string" && str.trim().length > 0) {
    str = str.replace(/\//g, '-'); // 将'/'替换成'-'
    return str
  } else {
    return ''
  }
}
/**
 * 加token的下载功能实现--后台为返回文件流
 * @param  {[type]} url    [description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function axgetdata(url,params,type){
  $Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'class': 'demo-spin-icon-load',
                    props: {
                        type: 'load-c',
                        size: 30
                    }
                }),
                h('div', 'Loading')
            ])
        }
    });
  axios({
        method: type?type:'get',
        url: url,
        params: params,
        responseType: 'blob'
      }).then((res) => {
        $Spin.hide();
        let blob = new Blob([res.data],{type: 'application/vnd.ms-excel'});
        //获取heads中的filename文件名
        let temp = res.headers["content-disposition"].split(";")[1].split("filename=")[1];
        let fileName = decodeURI(temp);//普通解码
        //对文件名乱码转义--【Node.js】使用iconv-lite解决中文乱码
        // let iconv = require('iconv-lite');
        //     iconv.skipDecodeWarning = true;//忽略警告
        // let fileName = iconv.decode(temp, 'gbk');
        console.log('fileName_',fileName)
        // return
         const link = document.createElement('a')
        if ('download' in link) {
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }else { // IE10+下载
        navigator.msSaveBlob(blob, fileName);
      }
      }).catch(error => {
        $Spin.hide();
        console.log(error)
      })
}
/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
function Debounce (fn, t) {
    let delay = t || 500;
    let timer;
    console.log(fn)
    console.log(typeof fn)
    return function () {
        let args = arguments;
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    }
};
/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 * 用法:
 * methods:{getAliyunData:Throttle(function(){},1000),}
 *
 */
function Throttle (fn, t) {
    let last;
    let timer;
    let interval = t || 500;
    return function () {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                // fn.apply(this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    }
};
window.Throttle = Throttle;
export {
  GetQueryString,
  GetIframeQueryString,
  GetRootPath,
  setCookie,
  getCookie,
  getData,
  postData,
  putData,
  deleteData,
  isLocalStorageSupported,
  IsPc,
  IEVersion,
  DateFormat,
  toFixed,
  getTodayFormatDate,
  getTodayFormatTime,
  isEmpty,
  extendObject,
  isObject,
  processlikeDateStr,
  escapeHtml,
  processEffectiveValue,
  str2Time,
  slash2Mid,
  axgetdata,
  Debounce,
  Throttle,
};
