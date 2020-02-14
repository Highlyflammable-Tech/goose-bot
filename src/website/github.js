const {Octokit}=require("@octokit/rest")
module.exports=function (handler,http,config) {
  handler.on('error', (error) => {
    console.error(error);
  })

  handler.on('issues',(event) => {
    if(event.payload.action==="opened"){
      //addd msg to issue
    }else if(event.payload.action ==="labeled")

  })
}
