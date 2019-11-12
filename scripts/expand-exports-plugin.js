
const toIdentifierName = str => str.replace(/[^\w]+/g, '');

/** expand-exports-plugin for Babel
 * This plugin expands exports for CommonJS modules into granular
 * export-default and export-all declarations.
 *
 * It takes a "map" option that must be an object from
 * module names (e.g. 'react') to filenames.
 * It then replaces export-all declarations (i.e. "export *") with
 * granular exports that export all named keys and a default export.
 */
const expandExportsPlugin = ({ template, types: t }) => ({
  visitor: {
    ExportAllDeclaration(path, state) {
      const { map } = state.opts;
      const module = path.node.source.value;
      const file = map[module];
      // We retrieve the module name and filename from the map
      if (typeof file === 'string') {
        // We turn the module name to a safe identifier
        const importId = t.identifier(toIdentifierName(module));
        // We retrieve all exports via CommonJS in Node
        const exportKeys = Object.keys(require(file));

        // import %importId% from "%file%;
        const importNode = t.importDeclaration(
          [t.importDefaultSpecifier(importId)],
          t.stringLiteral(file)
        );

        // export default %importId%;
        const defaultExportNode = t.exportDefaultDeclaration(importId);

        // export const { %exportKeys% } = %importId%;
        const exportsNode = t.exportNamedDeclaration(
          t.variableDeclaration(
            'const',
            [t.variableDeclarator(
              t.objectPattern(
                exportKeys.map(name => {
                  const identifier = t.identifier(name);
                  return t.objectProperty(
                    identifier,
                    identifier,
                    false,
                    true
                  );
                })
              ),
              importId
            )]
          ),
          []
        );

        // Replace the export-all declaration with new nodes
        path.replaceWithMultiple([
          importNode,
          defaultExportNode,
          exportsNode
        ]);
      }
    }
  }
});

export default expandExportsPlugin;
