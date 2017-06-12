/**
 * Created by Colin on 2017/6/12.
 */
const unAuthMap = {};


/**
 * 对页面进行一层包装，用unAuth包装的
 * @param App 页面对象，传入Component
 * @param appName 页面名称，传入‘string’用来作为标识
 * @returns 标识后的对象，用unAuthMap【appName】获取后为true
 */
const unAuth = (App, appName) => {
  unAuthMap[appName] = true;
  return App;
};


export default {
  unAuthMap,
  unAuth
};