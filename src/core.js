module.exports = function core(defaultLibraryName) {
  return ({ types }) => {
      return {
          visitor: {
              ImportDeclaration(path, _ref = {opts:{}}){
                  const specifiers = path.node.specifiers
                  const source = path.node.source

                  if (source.value !== defaultLibraryName
                      && source.value.indexOf(defaultLibraryName + '/merchant') === -1
                      && source.value.indexOf(defaultLibraryName + '/dp') === -1) {
                          return
                  }

                  if (!types.isImportDefaultSpecifier(specifiers[0]) ) {
                      const declarations = specifiers.map((specifier) => {
                          return types.ImportDeclaration(
                              [types.importDefaultSpecifier(specifier.local)],
                              types.StringLiteral(`${source.value}/${specifier.local.name}`)
                          )
                      })
                      path.replaceWithMultiple(declarations)
                  }
              }
          }
      }
  }
}
