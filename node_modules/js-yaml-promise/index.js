'use strict'

const yaml = require('js-yaml')

exports.safeLoad = (string, options) => new Promise((resolve, reject) => {
  try {
    resolve(yaml.safeLoad(string, options))
  } catch (err) {
    reject(err)
  }
})

exports.load = (string, options) => new Promise((resolve, reject) => {
  try {
    resolve(yaml.load(string, options))
  } catch (err) {
    reject(err)
  }
})

exports.safeLoadAll = (string, iterator, options) => new Promise((resolve, reject) => {
  try {
    resolve(yaml.safeLoadAll(string, iterator, options))
  } catch (err) {
    reject(err)
  }
})

exports.loadAll = (string, iterator, options) => new Promise((resolve, reject) => {
  try {
    resolve(yaml.loadAll(string, iterator, options))
  } catch (err) {
    reject(err)
  }
})

exports.safeDump = (object, options) => new Promise((resolve, reject) => {
  try {
    resolve(yaml.safeDump(object, options))
  } catch (err) {
    reject(err)
  }
})

exports.dump = (object, options) => new Promise((resolve, reject) => {
  try {
    resolve(yaml.dump(object, options))
  } catch (err) {
    reject(err)
  }
})

