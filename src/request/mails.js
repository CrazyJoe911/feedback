import axios from 'axios'

const SERVER_ADDR = 'http://10.2.12.201:3000'

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

export {
  getLineStackData,
  getBarBrushData,
  getPieData
}
