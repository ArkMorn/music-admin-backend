const Router = require('koa-router')
const router = new Router()
const callCloudFn = require("../utils/callCloudFn.js")
const callCloudDb = require("../utils/callCloudDb.js")
const callCloudStorage = require("../utils/callCloudStorage.js")

router.get("/list", async (ctx, next) => {
  const query = "db.collection('swiper').get()"
  const res = await callCloudDb(ctx, 'databasequery', query)
  const data = res.data
  let fileList = []
  for (let i = 0; i < data.length; i++) {
    fileList.push({
      fileid: JSON.parse(data[i]).fileId,
      max_age: 7200
    })
  }
  const dlRes = await callCloudStorage.download(ctx, fileList)
  console.log(dlRes)
  const returnData = dlRes.file_list
  const imgList = []
  for (let i = 0; i < returnData.length; i++) {
    imgList.push({
      download_url: returnData[i].download_url,
      fileid: returnData[i].fileid,
      _id: JSON.parse(data[i])._id
    })
  }
  ctx.body = {
    code: 20000,
    data: imgList
  }

})

module.exports = router