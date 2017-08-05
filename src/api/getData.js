import fetch from '../config/fetch'
/**
 * 登陆
 */
export const login = async data => await fetch('/login.php', data, 'POST');
/**
 * 注册
 * @param data
 */
export const signup = async data => await fetch('/register.php', data, 'POST');
export const getUserInfo = async data => await fetch('//user/user_own_information.php', data, 'POST');
