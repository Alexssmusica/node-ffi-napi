'use strict';
const path = require('path');
const ref = require('@alexssmusica/ref-napi');
const assert = require('assert');

assert(ref.instance);

const bindings = require('electron-bindings')(path.join(__dirname, '..'));
module.exports = bindings.initializeBindings(ref.instance);
