const path = require('path');

function searchAssets(
  assets = [],
  extensions = []
) {
  return Object.keys(assets).map(
    name => (
      extensions.indexOf(
        path.extname(
          name.indexOf('?') >= 0 ? name.split('?').slice(0, -1).join('') : name
        )
      ) >= 0 && { name, asset: assets[name] }
    )
  ).filter(a => a);
}

function searchFiles(
  modules = {},
  extensions = [],
  getter = a => a
) {
  return Object.keys(modules).map((name) => {
    const file = getter(modules[name]);

    if (!file) {
      return null;
    }

    return extensions.indexOf(path.extname(file)) >= 0 && file;
  }).filter(a => a);
}

module.exports = {
  assets: searchAssets,
  files: searchFiles
};
