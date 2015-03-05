const actionToStringNames = []

/**
 * Override actions toString methods. Pretty useful for pendings or logging.
 * Also ensures unique action name.
 */
export default function setToString(prefix: string, actions: Object) {
  Object.keys(actions).forEach(function(name) {
    const toStringName = prefix + '/' + name
    actions[name].toString = () => toStringName

    if (process.env.NODE_ENV != 'production') {
      if (actionToStringNames.indexOf(toStringName) != -1)
        throw Error(`Action ${toStringName} already exists.`)
      actionToStringNames.push(toStringName)
    }
  })
}
