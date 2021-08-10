const prepareModules = (relationships, keys) => Object
  .entries(relationships)
  .reduce((state, [_, relationship]) => ([
    ...state,
    ...relationship.map(([key]) => key)
  ]), [])
  .filter(module => keys.some(key => key.startsWith(module) && key !== module))
  .sort((a, b) => b.length - a.length)

export default prepareModules
