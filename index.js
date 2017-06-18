'use strict'

module.exports = MiddlewareBase => class Mime extends MiddlewareBase {
  description () {
    return 'Override the default mime-types'
  }

  middleware (options) {
    const mimeTypes = options.mime
    if (mimeTypes) {
      return function (ctx, next) {
        return next().then(() => {
          const path = require('path')
          const reqPathExtension = path.extname(ctx.path).slice(1)
          Object.keys(mimeTypes).forEach(mimeType => {
            const extsToOverride = mimeTypes[mimeType]
            if (extsToOverride.indexOf(reqPathExtension) > -1) ctx.type = mimeType
          })
        })
      }
    }
  }
}
