import query from './query'
import hasOne from './hasOne'
import hasMany from './hasMany'

const prepare = (relationships) => ({
  query: query(relationships)
})

export default {
  hasOne,
  hasMany,
  prepare
}
