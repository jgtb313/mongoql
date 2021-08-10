const moduleFieldName = (module, field) => {
  const props = field.split(module)
  
  if (props.length === 2) {
    const [_, name] = props
    return name.substring(1)
  }

  return '_id'
}

const buildProject = (modules, fields) => fields.reduce((state, field) => ({
  ...state,
  root: {
    ...state.root,
    [field]: 1
  },
  ...modules.reduce((moduleState, module) => ({
    ...moduleState,
    [module]: {
      ...moduleState[module],
      ...fields.reduce((fieldState, field) => ({
        ...fieldState,
        [moduleFieldName(module, field)]: 1
      }), {})
    }
  }), {})
}), { root: {} })

export default buildProject
