import relationship from './relationship'

const hasOne = (props, { localFieldArrayForeignField, localFieldAsArray = false } = {}) => (pipelines, { withMatch = false }) => ([
  relationship({
    ...props,
    localFieldArrayForeignField,
    localFieldAsArray,
    pipelines
  }),
  { $unwind: { path: `$${props.as}`, preserveNullAndEmptyArrays: !withMatch } }
])

export default hasOne
