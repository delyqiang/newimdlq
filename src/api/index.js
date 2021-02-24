/**
 * Created by lcrx-pzx.
 * Mail: recollection.vip@gmail.com
 * Date: 2018/4/11 17:47
 */

import {domainUrl} from './config';
import {postData,getData,putData,deleteData,axgetdata,Throttle} from '../util/utils';
export const DomainUrl = domainUrl;

// 地址栏拼接下载 WindowOpen
export const WindowOpen = (params) => {
  let usertoken = sessionStorage.getItem('ld_Token')==null ? '': sessionStorage.getItem('ld_Token') ;
  let Auth_token = 'Bearer ' + usertoken;
  let appId = sessionStorage.getItem('appId')==null ? '': sessionStorage.getItem('appId') ;
  window.open( DomainUrl +params+'&Authorization='+Auth_token+'&appId='+appId)
};
//文件流下载
export const Authorization = (url,params,type) => {
  return axgetdata(domainUrl + url, params,type)
};
//oss-图片上传
export const writetoken = (params) => {
  return postData(domainUrl + 'salary/wechat/public/write-token.do', params)
};
//短信验证码-需登录
export const SendCode = (params) => {
  return postData(domainUrl + 'salary/merchant/user/sendCode.do', params)
};
//点击发送短信验证码-后台进行判断成功才走发送短信验证码的接口
export const UserLogin = (params) => {
  return postData(domainUrl + 'salary/merchant/user/login.do', params)
};
//短信验证码--设置手机接收短信时使用-短信设置
export const POSTUSERCODE = (params) => {
  return postData(domainUrl + 'salary/merchant/user/code', params)
};
//短信设置-提交
export const USERsmsMessageConfig = (params) => {
  return postData(domainUrl + 'salary/merchant/user/smsMessageConfig', params)
};
