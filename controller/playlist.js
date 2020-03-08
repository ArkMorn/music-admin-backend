const Router=require("koa-router")
const router=new Router()
const callCloudFn=require("../utils/callCloudFn.js")
const callCloudDb=require("../utils/callCloudDb.js")

router.get('/list',async(ctx,next)=>{
    const query=ctx.request.query
    const res=await callCloudFn(ctx,'music',{
        $url:"playlist",
        start:parseInt(query.start),
        limit:parseInt(query.count)
    })
    const resp_data=res.resp_data
    const data=JSON.parse(resp_data).data
    ctx.body={
        code:20000,
        data
    }
})

router.get('/getById',async(ctx,next)=>{
    const query=`db.collection('playlist').doc('${ctx.request.query.id}').get()`
    const res =await callCloudDb(ctx,'databasequery',query)
    ctx.body={
        code:20000,
        data:JSON.parse(res.data)
    }
})

router.post('/updatePlaylist',async(ctx,next)=>{
    const params=ctx.request.body
    const query=`db.collection('playlist').doc('${params._id}').update({
        data:{
            name:'${params.name}',
            copywriter:'${params.copywriter}'
        }
    })`
    const res =await callCloudDb(ctx,'databaseupdate',query)
    ctx.body={
        code:20000,
        data:res
    }
})

router.get('/deletePlaylistItem',async(ctx,next)=>{
    const params=ctx.request.query
    const query=`db.collection('playlist').doc('${params.id}').remove()`
    const res=await callCloudDb(ctx,'databasedelete',query)
    ctx.body={
        code:20000,
        data:res
    }
})
module.exports=router