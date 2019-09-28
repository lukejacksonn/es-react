const replaceAssignPlugin = ({ types: t }) => ({
  visitor: {
    CallExpression(path, state) {
      const { callee, arguments: args } = path.node;

      if (
        t.isIdentifier(callee) &&
        callee.name === 'require' &&
        t.isStringLiteral(args[0]) &&
        args[0].value === 'object-assign'
      ) {
        path.replaceWithSourceString('Object.assign');
      }
    }
  }
});

export default replaceAssignPlugin;
