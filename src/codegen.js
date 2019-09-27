import codegen from 'codegen.macro';

codegen`
  const React = require("react");

  var code = "";
  code += "import React from 'react/cjs/react.production.min.js';\\n";
  code += "import ReactDOM from 'react-dom/cjs/react-dom.production.min.js';\\n";
  code += "\\n\\n";
  code += "export default React;\\n\\n";

  Object.keys(React).forEach(key => {
    code += "var " + key + " = React['" + key + "'];\\n";
  });

  code += "\\nexport {\\n";

  Object.keys(React).forEach(key => {
    code += "  " + key + ",\\n";
  });

  code += "  React,\\n";
  code += "  ReactDOM,\\n";
  code += "};\\n";

  module.exports = code;
`;
