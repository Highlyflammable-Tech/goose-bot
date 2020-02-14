class Tag {
  constructor(tag = {}) {
    Object.assign(this, tag)
  }
/*
The codes:
  1 = Missing input
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

}
module.exports = Tag;
