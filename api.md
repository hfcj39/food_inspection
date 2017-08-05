# 食品学院接口文档

### register
接口地址：shipin/register.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
role | string | 用户身份
username  |  string| 
password  |string| 密码必须8位以上
real_name  | string| 真实姓名
sex  | string| 可填
phone_number  | string| 可填
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 | 
message | string |成功/失败理由 
----------------------------------------
### login
接口地址：shipin/login.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
username  |  string| 
password  |string| 

```json
{
  "job_number":"xxx",
  "password":"xxx"
}

```
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
user|object|成功 用户信息
message | string | 失败理由
```json
{
  "role":"教师",
  "job_number":"xxxx",
  "username":"xxx",
  "password":"xxx",
  "sex":"xxx",
  "phone_number":"xxx"
}
```
----------------------------------------
### 用户信息
接口地址：shipin/user/user_own_information.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
user_id  |  string | 当前用户ID
```json
{
  "user_id":"7"
}
```
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
user|object|用户信息
message | string | 失败理由
```json
{
	"user_id": "7",
	"role": "教师",
	"job_number": "xxx",
	"username": "xxx",
	"password": "xxx",
	"sex": "",
	"phone_number": "xxx"
}
```
----------------------------------------


### 用户信息修改
接口地址：shipin/user/user_information_modify.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
user_id  |  string | 当前用户ID
password|string|密码必须8位以上
real_name|string|
sex|string|选填
phone_number|选填

```json
{
  "user_id":"7",
  "password":"xxx",
  "real_name":"xxx",
  "sex":"xxx",
  "phone_number":"xxx"
}
```
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
message | string | 成功/失败理由
----------------------------------------

### 用户审核表上传
接口地址：shipin/user/user_check_upload.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
user_id  |  string | 当前用户ID
content|array|审核表表单内容
item_id|string|审核项目对应考核价目表编号
type1|string/number|审核项目的细节补充
type2|string/number|根据考核价目生成
type3|string/number|根据考核价目生成
message | string | 成功/失败理由
```json
{
	"user_id":"1",
	"content":[
		{
			"item_id":"154",
			"type1":"yuyu",
			"type2":4
		},
		{
			"item_id":"13",
			"type1":45,
			"type2":6
		}	
		]
}
```
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
message | string | 成功/失败理由
----------------------------------------
### 用户审核表历史记录
接口地址：shipin/user/user_check_history.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
user_id  |  string | 当前用户ID
```json
{
  "user_id":"7"
}
```

#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
list|array|历史表单
order_id | string | 用户每次提交审核表后生成的编号
user_id  |  string | 当前用户ID
item_id| string |单条审核项目对应考核价目表编号
first_list| string |单条审核项目的一级目录内容
second_list| string |单条审核项目的二级目录内容
third_list| string |单条审核项目的三级目录内容
forth_list| string |单条审核项目的四级目录内容
score| string |单条审核项目的分数
detail| string |单条审核项目的细节
sum_score| string |审核表的总分
state| string |审核表审核状态 未审核/已通过/未通过
defeat_reason| string |审核表不通过原因
message | string | 失败理由 

```json
[  
  {
    "order_id": "16",
    "user_id": "1",
    "content": [
      {
        "item_id": "144",
        "first_list": "第二部分（科研工作）",
        "second_list": "科技成果奖",
        "third_list": "省部级科技进步、自然科学、技术发明奖三等奖",
        "forth_list": "",
        "score": "300.00",
        "detail": {
          "award_name": "qwqwqw"
        }
      },
      {
        "item_id": "13",
        "first_list": "第一部分（教学工作）",
        "second_list": "课堂教学",
        "third_list": "人才培养",
        "forth_list": "指导硕士生",
        "score": "15.00",
        "detail": {
          "people_number": 8,
          "time": 6
        }
      }
    ],
    "sum_score": "1020.00",
    "upload_time": "2017-08-01",
    "state": "未审核",
    "defeat_reason": null
  },
  {
    "order_id": "17",
    "user_id": "1",
    "content": [
      {
        "item_id": "144",
        "first_list": "第二部分（科研工作）",
        "second_list": "科技成果奖",
        "third_list": "省部级科技进步、自然科学、技术发明奖三等奖",
        "forth_list": "",
        "score": "300.00",
        "detail": {
          "award_name": "qwqwqw"
        }
      },
      {
        "item_id": "13",
        "first_list": "第一部分（教学工作）",
        "second_list": "课堂教学",
        "third_list": "人才培养",
        "forth_list": "指导硕士生",
        "score": "15.00",
        "detail": {
          "people_number": 8,
          "time": 6
        }
      }
    ],
    "sum_score": "1020.00",
    "upload_time": "2017-08-01",
    "state": "未审核",
    "defeat_reason": null
  }
  ...
]
```
----------------------------------------
### 用户审核表撤销
接口地址：shipin/user/repeal.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
user_id  |  string | 当前用户ID
order_id|string|需撤销的表单号 只能撤销未审核表单
````json
{
	"user_id":"1",
	"order_id":"7"
}
````
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
message | string | 成功/失败理由
----------------------------------------
### 审核员审核
接口地址：shipin/checker/check.php

请求方式：post
#####请求
参数 | 类型 | 备注    
----|----|----
user_id  |  string | 当前用户ID
order_id|string|需审核的审核表单号
state|option|已通过/不通过
defeat_reason|string|不通过原因 不通过必须填写不通过原因
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
message | string | 成功/失败理由
----------------------------------------
### 审核员查询未审核表单
接口地址：shipin/checker/not_check_list.php

请求方式：post
#####请求
参数 | 类型 | 备注    
----|----|----
user_id  |  string | 当前用户ID
```json
{
	"user_id":"2"
}
```
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
list|array|历史表单
message | string | 失败理由
```json
[
   {
     "order_id": "16",
     "user_id": "1",
     "content": [
       {
         "item_id": "144",
         "first_list": "第二部分（科研工作）",
         "second_list": "科技成果奖",
         "third_list": "省部级科技进步、自然科学、技术发明奖三等奖",
         "forth_list": "",
         "score": "300.00",
         "detail": {
           "award_name": "qwqwqw"
         }
       },
       {
         "item_id": "13",
         "first_list": "第一部分（教学工作）",
         "second_list": "课堂教学",
         "third_list": "人才培养",
         "forth_list": "指导硕士生",
         "score": "15.00",
         "detail": {
           "people_number": 8,
           "time": 6
         }
       }
     ],
     "sum_score": "1020.00",
     "upload_time": "2017-08-01",
     "state": "未审核",
     "defeat_reason": null
   },
   {
     "order_id": "17",
     "user_id": "1",
     "content": [
       {
         "item_id": "144",
         "first_list": "第二部分（科研工作）",
         "second_list": "科技成果奖",
         "third_list": "省部级科技进步、自然科学、技术发明奖三等奖",
         "forth_list": "",
         "score": "300.00",
         "detail": {
           "award_name": "qwqwqw"
         }
       },
       {
         "item_id": "13",
         "first_list": "第一部分（教学工作）",
         "second_list": "课堂教学",
         "third_list": "人才培养",
         "forth_list": "指导硕士生",
         "score": "15.00",
         "detail": {
           "people_number": 8,
           "time": 6
         }
       }
     ],
     "sum_score": "1020.00",
     "upload_time": "2017-08-01",
     "state": "未审核",
     "defeat_reason": null
   }
   ...
 ]
```
----------------------------------------


### 审核员查询教师信息
接口地址：shipin/checker/teacher_list.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
user_id  |  string | 当前用户ID
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
list|array|历史表单
message | string | 失败理由
```json
[
  {
    "user_id": "2",
    "role": "教师",
    "username": "49",
    "real_name": "4959465425",
    "password": "51857823",
    "sex": "23236",
    "phone_number": "502112930"
  },
  {
    "user_id": "3",
    "role": "教师",
    "username": "424",
    "real_name": "3480366509",
    "password": "73582519",
    "sex": "2624747926",
    "phone_number": "3537041145"
  }
  ...
]  
```
----------------------------------------
### 审核员增加考核价目表内容
接口地址：shipin/table/add_score_table.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
user_id  |  string | 当前用户ID
first_list| string |新增审核项目的一级目录内容
second_list| string |新增审核项目的二级目录内容
third_list| string |新增审核项目的三级目录内容
forth_list| string |新增审核项目的四级目录内容
score| string |新增审核项目的分数
type1|string|新增审核项目的细节内容
```json
{
	"user_id":"2",
	"first_list":"xxx",
	"second_list":"xxx",
	"third_list":"xxx",
	"forth_list":"xxx",
	"score":"xxx",
	"type1":"xxx"
}
```
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
message | string | 成功/失败理由
-------------------------------------
### 审核员删除考核价目表内容
接口地址：shipin/table/delete_score_table.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
user_id  |string | 当前用户ID
item_id|string|需删除的审核价目表项目的编号
```json
{
	"user_id":"2",
	"item_id":"x"
}
```
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
message | string | 成功/失败理由
---------------------------------------

### 审核员修改考核价目表内容
接口地址：shipin/table/modify_score_table.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
user_id  |  string | 当前用户ID
item_id|string|需修改的审核价目表项目的编号
first_list| string |新增审核项目的一级目录内容
second_list| string |新增审核项目的二级目录内容
third_list| string |新增审核项目的三级目录内容
forth_list| string |新增审核项目的四级目录内容
score| string |新增审核项目的分数
type1|string|新增审核项目的细节内容
```json
{
	"user_id":"2",
	"item_id":"xx",
	"first_list":"xxx",
	"second_list":"xxx",
	"third_list":"xxx",
	"forth_list":"xxx",
	"score":"xxx",
	"type1":"xxx"
}
```
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
message | string | 成功/失败理由
---------------------------------------
### 审核员查找考核价目表内容
接口地址：shipin/table/search_score_table.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
user_id  |string | 当前用户ID
item_id|string|需删除的审核价目表项目的编号
```json
{
	"user_id":"2",
	"item_id":"x"
}
```
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
result|object|查找内容
message | string | 失败理由
```json
{
  "item_id": "154",
  "first_list": "第三部分（社会活动）",
  "second_list": "教研室活动",
  "third_list": "参加校辅导班获结业证书",
  "forth_list": "",
  "score": "10.00"
}
```
---------------------------------------
### 考核价目表内容
接口地址：shipin/table/table.php

#####请求
参数 | 类型 | 备注
----|----|----
无
#####返回
参数 | 类型 | 备注
----|----|----
result|object|考核价目表整体内容
```json
[
  {
    "item_id": "1",
    "first_list": "第一部分（教学工作）",
    "second_list": "课堂教学",
    "third_list": "授课",
    "forth_list": "研究生、本科生（高职）所有课程[学生人数<=60]",
    "score": "1.00"
  },
  {
    "item_id": "2",
    "first_list": "第一部分（教学工作）",
    "second_list": "课堂教学",
    "third_list": "授课",
    "forth_list": "研究生、本科生（高职）所有课程[学生人数61-80]",
    "score": "1.10"
  }
  ...
]
```
---------------------------------------

### 超级管理员查询所有用户信息
接口地址：shipin/spure_admin/all_user_list.php

请求方式：post
#####请求
参数 | 类型 | 备注
----|----|----
user_id  |string | 当前用户ID
```json
{
	"user_id":"5"
}
```


参数 | 类型 | 备注
----|----|----
result | boolean | 
data | object | 
errorInfo | string | 

data
```json
[
  {
    "user_id": "1",
    "role": "教师",
    "username": "1441188",
    "real_name": "郝少奇",
    "password": "11111111",
    "sex": "男",
    "phone_number": "18516515841"
  },
  {
    "user_id": "6",
    "role": "教师",
    "username": "144115",
    "real_name": "xxx",
    "password": "12345678",
    "sex": "",
    "phone_number": "12345678910"
   }
   ...
]
```
----------------------------------------
### 超级管理员修改用户信息
接口地址：shipin/checker/checker_own_information.php

请求方式：post
#####请求
参数 | 类型 | 备注    
----|----|----
role | string | 用户身份
username  |  string| 
password  |string| 密码必须8位以上
real_name  | string| 真实姓名
sex  | string| 可填
phone_number  | string| 可填
```json
{
     "user_id":"5",
     "role":"教师",
     "job_number":"144166",
     "username":"xxx",
     "password":"12345678",
     "sex":"男",
     "phone_number":"12345678910"
}
```
#####返回
参数 | 类型 | 备注
----|----|----
http状态码 | http状态码 |
message | string | 成功/失败理由
     	

