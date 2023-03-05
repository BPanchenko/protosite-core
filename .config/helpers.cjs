const path = require('path');
const { kebabCase, trim } = require('lodash');

const ROOT = process.cwd();
const OUTPUT = path.resolve(ROOT, `esm`);

const getFileEntryByRelativePath = (relativePath, typeName = '') => {
  const absolutePath = path.resolve(ROOT, relativePath);
  const props = path.parse(absolutePath);

  let name = kebabCase(props.name + '-' + (typeName || ''));
  name = trim(name, '-');

  return [name, absolutePath];
};

const types = Object.create(
  {
    get selected() {
      const proto = Object.getPrototypeOf(this);
      const key = proto.selectedKey;
      return key ? this[key] : null;
    },
    selectedKey: false,
    selectByProperty: (name, value) => {
      const proto = Object.getPrototypeOf(types);
      const keys = Object.keys(types);
      for (const key of keys) {
        const data = types[key];
        const selected = data.hasOwnProperty(name) && data[name] === value;
        proto.selectedKey = selected ? key : false;
        if (selected) break;
      }
      return proto.selectedKey;
    }
  },
  {
    CE: {
      value: Object.freeze({
        name: 'CustomElement',
        dashed: 'custom-element',
        plural: 'custom-elements',
        source: 'component'
      }),
      enumerable: true
    },
    CP: {
      value: Object.freeze({
        name: 'CorePart',
        dashed: 'core-part',
        plural: 'core-parts',
        source: 'trunk'
      }),
      enumerable: true
    },
    WC: {
      value: Object.freeze({
        name: 'WebComponent',
        dashed: 'web-component',
        plural: 'web-components',
        source: 'component'
      }),
      enumerable: true
    }
  }
);

module.exports = {
  ROOT,
  OUTPUT,
  getFileEntryByRelativePath,
  types
};
