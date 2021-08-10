const relationship = ({
  from,
  localField = '_id',
  foreignField = '_id',
  as,
  localFieldArrayForeignField,
  localFieldAsArray = false,
  pipelines = []
}) => {
  const pipeline = []

  pipeline.push({
    $addFields: {
      value: '$$value'
    }
  })

  localFieldAsArray &&
    pipeline.push({
      $unwind: '$value'
    })

  pipeline.push({
    $match: {
      $expr: {
        $eq: [
          `$${foreignField}`,
          localFieldArrayForeignField
            ? `$value.${localFieldArrayForeignField}`
            : '$value'
        ]
      }
    }
  })

  localFieldArrayForeignField &&
    pipeline.push({
      $addFields: {
        [`value.${localFieldArrayForeignField}`]: '$$ROOT'
      }
    })

  localFieldAsArray && localFieldArrayForeignField &&
    pipeline.push({
      $replaceRoot: { newRoot: '$value' }
    })

  pipeline.push(...pipelines)

  return {
    $lookup: {
      from,
      let: { value: `$${localField}` },
      pipeline,
      as
    }
  }
}

export default relationship
