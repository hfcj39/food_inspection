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
/**
 * 获取用户信息
 * @param data
 */
export const getUserInfo = async data => await fetch('/user/user_own_information.php', data, 'POST');
/**
 * 修改用户信息
 * @param data
 */
export const updateUserInfo = async data => await fetch('/user/user_information_modify.php',data,'POST');
/**
 * 获取历史审核表
 * @param data
 */
export const getHistoryList = async data => await fetch('/user/user_check_history.php',data,'POST');
/**
 * 撤销申请表
 * @param data
 */
export const repeal = async data => await fetch('/user/repeal.php',data,'POST');
/**
 * 获取评分表
 * @param data
 */
export const getScoreTable = async data => await fetch('/score_table/table.php',data,'POST');
/**
 * 上传用户审核表
 * @param data
 */
export const uploadTable = async data => await fetch('/user/user_check_upload.php',data,'POST');
/**
 * 查询教师列表
 * @param data
 */
export const getTeacherList = async data => await fetch('/checker/teacher_list.php',data,'POST');
export const getCheckList = async data => await fetch('/checker/not_check_list.php',data,'POST');
