const buildPipelines = (relationships, { modules, $relationshipsMatch, $relationshipsProject }) => Object
  .entries(relationships)
  .reduce((state, [_, pipelines]) => {
    const isRequiredModule = ([module]) => modules.includes(module)
    const joinModules = ($pipelines, [relationship, relationships]) => {
      const $match = $relationshipsMatch[relationship] || {}
      const $project = $relationshipsProject[relationship]
      const withMatch = !!$relationshipsMatch[relationship]
      return relationships([{ $match }, ...$pipelines, { $project }], { withMatch })
    }
    return [
      ...state,
      ...pipelines
        .filter(isRequiredModule)
        .reduce(joinModules, [])
    ]
  }, [])

export default buildPipelines
