import relationship from './relationship'

const hasMany = (props, { localFieldArrayForeignField, localFieldAsArray = false } = {}) => (pipelines, { withMatch = false }) => {
  const withMatchConditional = withMatch
    ? { $expr: { $gt: [{ $size: `$${props.as}` }, 0] } }
    : {}
  return [
    relationship({
      ...props,
      localFieldArrayForeignField,
      localFieldAsArray,
      pipelines
    }),
    { $match: withMatchConditional }
  ]
}

export default hasMany
