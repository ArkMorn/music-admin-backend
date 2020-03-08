const rp = require('request-promise')
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')

const APPID = `wxd9045463b7fe856f`
const APPSECRET = `c221215d0bde56586c9e87244bf5de4e`
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

const updateAccessToken = async () => {
    const res = await rp(URL)
    console.log(res)
    const str = JSON.parse(res)
    if (str.access_token) {
        fs.writeFileSync(fileName, JSON.stringify({
            access_token: str.access_token,
            createTime: new Date()
        }))
    } else {
        await updateAccessToken()
    }
}

const getAccessToken = async () => {
    try {
        const readStr = fs.readFileSync(fileName, 'utf-8')
        const readObj = JSON.parse(readStr)
        const createTime = new Date(readObj.createTime).getTime()
        const nowTime = new Date().getTime()
        if ((nowTime - createTime) / 1000 / 60 / 60 >= 2) {
            await updateAccessToken()
            await getAccessToken()
        }
        return readObj.access_token
    } catch (err) {
        await updateAccessToken()
        await getAccessToken()
    }
}
setInterval(async () => {
    await updateAccessToken()
}, (7200 - 300) * 1000)
module.exports=getAccessToken