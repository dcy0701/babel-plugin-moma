module.exports = function core(defaultLibraryName) {
  return ({ types }) => ({
    visitor: {
      ImportDeclaration(path) {
        const specifiers = path.node.specifiers;
        const source = path.node.source;

        if ([defaultLibraryName, defaultLibraryName + '/merchant',
                defaultLibraryName + '/dp'].indexOf(source.value) === -1) {
          return;
        }

        let themeName = '';

        switch (source.value) {
          case '@dp/moma-ui/merchant':
            themeName = '/merchant';
            break;
          case '@dp/moma-ui/dp':
            themeName = '/dp';
            break;
          default:
            themeName = '';
        }

        if (!types.isImportDefaultSpecifier(specifiers[0])) {
          const declarations = specifiers.map((specifier) =>
        types.ImportDeclaration([types.importDefaultSpecifier(specifier.local)],
          types.StringLiteral(defaultLibraryName + '/' + specifier.local.name + themeName)));
          path.replaceWithMultiple(declarations);
        }
      },
    },
  });
};
