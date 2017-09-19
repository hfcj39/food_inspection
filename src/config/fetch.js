import {baseUrl} from './env'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;

  if(type === 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    });

    if(dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  if(window.fetch && method === 'fetch') {
    let requestConfig = {
      //credentials: 'include',
      method : type,
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      mode   : "cors",
      cache  : "force-cache"
    };

    if(type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig);
      let type = response.headers.get('Content-Type');
      if(type === 'application/octet-stream') {
        let tmp = await response.blob();
        let obj_url = window.URL.createObjectURL(tmp);
        let filename = response.headers.get('Content-Disposition') || 'table.doc';
        return Promise.resolve({
          ok        : response.ok,
          status    : response.status,
          statusText: response.statusText,
          filename  : filename,
          url       : obj_url
        })
      }
      const responseJson = await response.json();
      return Promise.resolve({
        ok        : response.ok,
        status    : response.status,
        statusText: response.statusText,
        content   : responseJson
      });
    } catch(error) {
      return {content:{message:'请求失败'}};
      // throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if(window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if(type === 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if(requestObj.readyState === 4) {
          if(requestObj.status === 200) {
            let obj = requestObj.response;
            if(typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
