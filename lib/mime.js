'use strict'
const path = require('path')

class Mime {
  middleware (options) {
    const mimeTypes = options.mime
    if (mimeTypes) {
      return function (ctx, next) {
        return next().then(() => {
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

module.exports = Mime
