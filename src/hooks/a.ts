const params = {
  disabled: false,
  table: {
    disabled: () => false,
    list: {
      disabled: true
    }
  }
}

const getProp = (params = {}, key = '', path = []) => {
  let result = undefined
  if (path && path.length) {
    result = path.reduce((prev, value) => {
      console.log('value=>', value)
      if (prev && prev.hasOwnProperty(value)) {
        return prev[value] === undefined ? undefined : prev[value]
      } else {
        return undefined
      }
    }, params)
  }
  console.log('result=>', result)
  if (result) {
    return result[key]
  } else {
    return params[key]
  }
}

console.log('结果：' + getProp(params, 'disabled', ['table','list']))
