const subbedUserModel = require('./models/subbedUserModel')
async function createSubbedUser(authorId,distcode,age)
{
    let condition = {authorid:authorId}
    let data =  {
        authorid:authorId,
         distcode: distcode,
         age:age,
         notify:true
        }
      await subbedUserModel.findOneAndUpdate(condition,data,{useFindAndModify :false,upsert: true})
         .catch((err)=>{
          console.log(err);
         })     
}
async function modifyAge(authorId,age)
{
    let condition = {authorid:authorId}
    let data =  {
         age:age,
        }
      await subbedUserModel.findOneAndUpdate(condition,data,{useFindAndModify :false,upsert: true})
         .catch((err)=>{
          console.log(err);
         })
}
async function modifyDist(authorId,distcode)
{
    let condition = {authorid:authorId}
    let data =  {
        distcode: distcode,
        }
      await subbedUserModel.findOneAndUpdate(condition,data,{useFindAndModify :false,upsert: true})
         .catch((err)=>{
          console.log(err);
         })
}
async function unsubUser(authorId)
{
    let condition = {authorid:authorId}
    let data = {
        notify:false
        }
      await subbedUserModel.findOneAndUpdate(condition,data,{useFindAndModify :false,upsert: true})
         .catch((err)=>{
          console.log(err);
         })
}

async function getSubbedUsers(){
    let condition = { notify:true}
    const subUsers = await subbedUserModel.find(condition)
    .catch(err=>console.log(err));
    return subUsers;
}
module.exports={
    createSubbedUser,
    modifyAge,
    modifyDist,
    unsubUser,
    getSubbedUsers
}