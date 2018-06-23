import axios from 'axios'
import deep from 'deep-get-set'

const SERVER_ADDR = 'http://localhost:3000'

async function getLineStackData (from, start, end, interval = 10) {
  const result = await axios.get(`${SERVER_ADDR}/messages/line-stack`, {
    params: {
      q: JSON.stringify({
        from: {
          $in: from
        },
        startTime: (new Date(start)).getTime(),
        endTime: (new Date(end)).getTime(),
        frameNum: interval
      })
    }
  })
  return result.data
}

async function getBarBrushData (from) {
  const result = await axios.get(`${SERVER_ADDR}/messages/bar-brush`, {
    params: {
      q: JSON.stringify({
        from: {
          $in: from
        }
      })
    }
  })
  return result.data
}

async function getPieData (from) {
  const result = await axios.get(`${SERVER_ADDR}/messages/pie`)
  return result.data
}

async function getParsedMessages () {
  const response = await axios.get(`${SERVER_ADDR}/messages`)
  const messages = response.data

  const result = {
    '1F': {},
    '2F': {},
    '3F': {}
  }
  messages.forEach(message => {
    if (!deep(result, [message.floor, message.unit])) {
      deep(result, [message.floor, message.unit], {
        name: message.name,
        messages: []
      })
    }
    result[message.floor][message.unit].messages.push(
      {
        content: message.content,
        star: message.star,
        person: message.person,
        time: new Date(message.time)
      }
    )
  })
  return result
}

export {
  getLineStackData,
  getBarBrushData,
  getPieData,
  getParsedMessages
}
