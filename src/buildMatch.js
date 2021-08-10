const buildMatch = (modules, fields) => fields.reduce((result, [key, value]) => {
  if (!value) {
    return result
  }

  const isRoot = !key.includes('.')
  const prop = (isRoot ? 'root' : modules.find(module => key.startsWith(module))) || 'root'
  const name = isRoot
    ? key
    : key.split(prop).reverse()[0].replace(/^\./, '')

  const current = result[prop] || {}

  return {
    ...result,
    [prop]: {
      ...current,
      [name]: value
    }
  }
}, { root: {} })

export default buildMatch
