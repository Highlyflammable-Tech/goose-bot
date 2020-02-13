class Tag {
  constructor(tag = {}) {
    Object.assign(this, tag)
  }

  date(time = new Date()) {
    this.created=time
    return this;
  }

  owner(owner){
    if(owner===undefined)throw "No user inputted";
    this.owner=owner
    return this;
  }

  name(name){
    if(name===undefined)throw "No name inputted";
    this.name=name
    return this;
  }

  message(msg=""){
    this.msg=msg
    return this;
  }

  addAliases(alias){
    if(alias===undefined)throw "No alias added";
    this.aliases.push(alias)
    return this;
  }

  remodeAliases(alias){
    if(alias===undefined)throw "No alias added"
    let index = this.aliases.indexOf(alisa)
    if(index===-1)throw `${alias} not found`
    this.aliases.split(index,1)
    return this;
  }

  create(db){
    if(db===undefined)throw "No database passed";
    //checking if it already a tag//
    db.db("data").collection("tags").findOne({
      name:this.name
    },function (err,result) {
      if(err)throw err;
      if(result!==undefined)throw "That tag already exists";
      //creating tag//
      db.db("data").collection("tags").insertOne(this,function (err,res) {
        if(err)throw err;
        return "Tag created"
      })
    })
  }

  edit(db){
    if(db===undefined)throw "No database passed";
    //checking for tag//
    db.db("data").collection("tags").findOne({
      name:this.name
    },function(err,res) {
      if(err)throw err;
      if(res===undefined)throw "No tag found";
      db.db("data").collection("tags").updateOne({
        name:this.name
      },{
        $set:this
      },function (err,res) {
        if(err)throw err
        return "Tag updated";
      })
    })
  }
}
module.exports = Tag;
