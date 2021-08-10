const prepareQuery = (value = {}) => {
  const { fields = '_id', ...query } = value

  const match = Object.entries(query)
  const project = fields.split(',')

  const keys = [...new Set([
    ...match.map(([key]) => key),
    ...project
  ])]

  return {
    match,
    project,
    keys
  }
}

export default prepareQuery
