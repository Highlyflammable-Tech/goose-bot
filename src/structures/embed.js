/**
 * Used to build embeds
 * @param {Object} embed=Object An existing embed that can be edited.
 */
class Embed {
  constructor(embed = {
    "embed": {
      "fields": []
    },
    "content": ""
  }) {
    Object.assign(this, embed)
    return this;
  }
  /**
   * @param {string} message The message to be added.
   */
  message(content = "") {
    this.content = content
    return this;
  }
  /**
   * @param {string} title The title of the embed
   * @param {string} url="" The URL in the title
   */
  title(title, url = "") {
    this.embed.title = title.toString().substring(0, 256)
    this.embed.url = url
    return this;
  }
  /**
   * @param {string} name The message to be added.
   * @param {string} icon="" The icon for the author
   * @param {string} url="" The url in the author
   */
  author(name, icon = "", url = "") {
    this.embed.author = {
      "name": name.toString().substring(0, 256),
      "url": url,
      "icon_url": icon
    }
    return this;
  }
  /**
   * @param {string} color=13873944 The colour of the embed.
   * Can use hex.
   */
  color(color = 13873944) {
    this.embed.color = (color[0] === "#") ? parseInt(color.replace("#", ""), 16) : color
    return this;
  }
  /**
   * @param {date} time=Date() The timestamp on the embed
   */
  timestamp(time = new Date()) {
    this.embed.timestamp = time
    return this;
  }

  /**
   * @param {string} image The thumnail on the embed
   */
  thumnail(image) {
    this.embed.thumnail = {
      "url": image
    }
    return this;
  }

  /**
   * @param {string} image The image on the embed
   */
  image(image) {
    this.embed.image = {
      "url": image
    }
    return this;
  }
  /**
   * @param {string} text The text in the footer
   * @param {string} icon The icon in the footer
   */
  footer(text, icon = "") {
    this.embed.footer = {
      "icon_url": icon,
      "text": text
    }
    return this;
  }

  /**
   * @param {string} value The text in the description of the embed
   */
  description(value) {
    this.embed.description = value.toString().substring(0, 2048)
    return this;
  }
  /**
   * @param {string} title The title of the field
   * @param {string} value The text inside the field
   * @param {boolean} inline If the field should be inline
   */
  addField(title, value, inline = false) {
    this.embed.fields.push({
      "name": title.toString().substring(0, 256),
      "value": value.toString().substring(0, 1024),
      "inline": inline
    })
    return this;
  }

  /**
   * Used to add a random image to the embed
   * @param {Client} client The client that is running
   * @param {Message} msg The msg that was received
   */
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
