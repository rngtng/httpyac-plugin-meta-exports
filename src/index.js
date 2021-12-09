module.exports = (api) => {
  api.hooks.onResponse.addHook('register exports', (response, context) => {
    const varExports = context.httpRegion.metaData.exports;

    if(varExports) {
      var pair = varExports.split('=', 2),
      variable = pair[0].trim(),
      value = pair[1].trim().replace('response', 'context.variables.response.parsedBody');

      context.variables[variable] = eval(value);
    }
  });
};