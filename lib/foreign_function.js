'use strict';
/**
 * Module dependencies.
 */

const CIF = require('./cif');
const _ForeignFunction = require('./_foreign_function');
const debug = require('debug')('ffi:ForeignFunction');
const assert = require('assert');
const ref = require('@alexssmusica/ref-napi');

/**
 * Represents a foreign function in another library. Manages all of the aspects
 * of function execution, including marshalling the data parameters for the
 * function into native types and also unmarshalling the return from function
 * execution.
 */

function ForeignFunction (funcPtr, returnType, argTypes, abi) {
  debug('creating new ForeignFunction', funcPtr);

  // check args
  assert(Buffer.isBuffer(funcPtr), 'expected Buffer as first argument');
  assert(!!returnType, 'expected a return "type" object as the second argument');
  assert(Array.isArray(argTypes), 'expected Array of arg "type" objects as the third argument');

  // normalize the "types" (they could be strings,
  // so turn into real type instances)
  returnType = ref.coerceType(returnType);
  argTypes = argTypes.map(ref.coerceType);

  // create the `ffi_cif *` instance
  const cif = CIF(returnType, argTypes, abi);

  // create and return the JS proxy function
  return _ForeignFunction(cif, funcPtr, returnType, argTypes);
}

module.exports = ForeignFunction;
