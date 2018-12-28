// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()
// 初始化 database
const db = cloud.database()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async  (event, context) => {
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()
  const _ = db.command
  const history = db.collection('history')
  //  console.log(event)
  //  console.log(context)
  var nm = event.name
  var id = event.id3
  var index = event.index
  var rr = ""
  //add history 
  try {
    await history.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
        name: nm,
        id: id,
        due: db.serverDate(),
        phone: ""
      }
    })
  } catch (e) {
    console.error(e)
  }

  //query myopia
  console.log(nm, id, index[0]);
  const myopia = db.collection('result');
  try {
    return await myopia.where({
      ID3: id
    })
    .get()
  } catch (e) {
    console.error(e);
    console.log("error")
  }
}