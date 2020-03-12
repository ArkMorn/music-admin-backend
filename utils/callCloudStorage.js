const rp=require('request-promise')
const getAccessToken=require('./getAccessToken.js')
const fs=require("fs")

const cloudStorage={
  async download(ctx,fileList){
    const ACCESS_TOKEN=await getAccessToken()
    const options={
      method:"POST",
      uri:`https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${ACCESS_TOKEN}`,
      body:{
        env:ctx.state.env,
        file_list:fileList
      },
      json:true
    }
    return await rp(options).then(res=>{
        return res
    }).catch(err=>{
      console.log(err)
    })
  }
}
module.exports=cloudStorage