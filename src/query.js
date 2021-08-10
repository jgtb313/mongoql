import prepareQuery from './prepareQuery'
import prepareModules from './prepareModules'
import buildMatch from './buildMatch'
import buildProject from './buildProject'
import buildPipelines from './buildPipelines'

const query = (relationships) => (query) => {
  const { match, project, keys } = prepareQuery(query)
  const modules = prepareModules(relationships, keys)

  const { root: $match, ...$relationshipsMatch } = buildMatch(modules, match)
  const { root: $project, ...$relationshipsProject } = buildProject(modules, project)
  const $pipelines = buildPipelines(relationships, {
    modules,
    $relationshipsMatch,
    $relationshipsProject
  })

  return [
    { $match },
    ...$pipelines,
    { $project }
  ]
}

export default query
