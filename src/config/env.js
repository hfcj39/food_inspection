/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let routerMode = 'history';
let baseImgPath = '/static/default_user.jpg';

if (process.env.NODE_ENV === 'development') {
  //baseUrl = 'http://118.89.103.204:3000';
  baseUrl = 'http://114.55.136.29/shipin';
}else{
  baseUrl = 'http://114.55.136.29/shipin';
}

export {
  baseUrl,
  routerMode,
  baseImgPath
}
