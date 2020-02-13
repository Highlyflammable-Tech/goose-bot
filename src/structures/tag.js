class Tag {
  constructor(tag = {}) {
    Object.assign(this, tag)
  }
/*
The codes:
  0 = It worked
  1 = Missing input
  2 = No database argument
  3 = No tag found
  4 = Tag already exists
*/
  date(time = new Date()) {
    this.created=time
    return this;
  }

  owner(owner){
    if(owner===undefined)return "1";
    this.owner=owner
    return this;
  }

  name(name){
    if(name===undefined)return "1";
    this.name=name
    return this;
  }

  message(msg=""){
    this.msg=msg
    return this;
  }

  create(db){
    if(db===undefined)return "2";
    //checking if it already a tag//
    db.db("data").collection("tags").findOne({
      name:this.name
    },function (err,result) {
      if(err)throw err;
      if(result!==undefined)return "4";
      //creating tag//
      db.db("data").collection("tags").insertOne(this,function (err,res) {
        if(err)throw err;
        return "0"
      })
    })
  }

  edit(db){
    if(db===undefined)return "2";
    //checking for tag//
    db.db("data").collection("tags").findOne({
      name:this.name
    },function(err,res) {
      if(err)throw err;
      if(res===undefined)return "3";
      db.db("data").collection("tags").updateOne({
        name:this.name
      },{
        $set:this
      },function (err,res) {
        if(err)throw err
        return "0";
      })
    })
  }
}
module.exports = Tag;
