class Embed {
  constructor(embed = {
    "embed": {
      "fields": []
    },
    "content": ""
  }){
    Object.assign(this, embed)
    return this;
  }

  message(content = "") {
    this.content = content
    return this;
  }

  title(title, url = "") {
    this.embed.title = title.toString().substring(0, 256)
    this.embed.url = url
    return this;
  }

  author(name, icon = "", url = "") {
    this.embed.author = {
      "name": name.toString().substring(0, 256),
      "url": url,
      "icon_url": icon
    }
    return this;
  }

  color(color = 13873944) {
    this.embed.color = (color[0] === "#") ? parseInt(color.replace("#", ""), 16) : color
    return this;
  }

  timestamp(time = new Date()) {
    this.embed.timestamp = time
    return this;
  }

  thumnail(image) {
    this.embed.thumnail = {
      "url": image
    }
    return this;
  }

  image(image) {
    this.embed.image = {
      "url": image
    }
    return this;
  }

  footer(text, url = "") {
    this.embed.footer = {
      "icon_url": url,
      "text": text
    }
    return this;
  }

  description(value) {
    this.embed.description = value.toString().substring(0, 2048)
    return this;
  }

  addField(title, value, inline = false) {
    this.embed.fields.push({
      "name": title.toString().substring(0, 256),
      "value": value.toString().substring(0, 1024),
      "inline": inline
    })
    return this;
  }

  send(client, msg) {
    //random image//
    let images = ["", "", "https://file.coffee/pk1hzydPo.gif", "", "", "", "https://file.coffee/a4Ww80qFK.png", "https://file.coffee/kkLum4nVe.png", "https://file.coffee/0QfbTcfdr.png", "https://file.coffee/rXFMQIU0S.png", "https://file.coffee/CU-GVlaxI.png", "https://file.coffee/V41rtFtCm.png", "https://file.coffee/ipAyCS-6f.png"]
    this.embed.image = {
      "url": images[Math.floor(Math.random() * Math.floor(images.length))]
    }
    client.createMessage(msg.channel.id, this)
  }
}
module.exports = Embed;
