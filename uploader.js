// core node, https://nodejs.org/api/path.html
const path = require('path')
const igemwiki = require('igemwiki-api')({ year: 2018, teamName: 'Rotterdam_HR' })
const Promise = require('bluebird')
const globby = require('globby')
const _ = require('lodash')
const _dir = __dirname + '../../../www/'

const index = {
  type: 'page',
  fileName: path.resolve(_dir, 'generated html/index.html'),
  page: ''
}

const getTemplates = globby([ path.resolve(_dir, 'templates/*.html') ]).then(function (templates) {
  return templates.map(function (template) {
    return {
      type: 'template',
      fileName: path.resolve(__dirname, template),
      page: path.basename(template).replace('.html', '')
    }
  })
})

const getCSS = globby([ path.resolve(_dir, 'css/*.css') ]).then((stylesheets) => {
  return stylesheets.map((stylesheet) => {
    return {
      type: 'stylesheet',
      fileName: path.resolve(__dirname, stylesheet),
      page: path.basename(stylesheet).replace('.css', '')
    }
  })
})

const getJS = globby([ path.resolve(_dir, 'js/*.js') ]).then(scripts => scripts.map(script => ({
  type: 'script',
  fileName: path.resolve(__dirname, script),
  page: path.basename(script).replace('.js', '')
})))

const getPages = globby([ path.resolve(_dir, 'generated html/*.html') ]).then(pages => pages.map(page => ({
	type: 'page',
	fileName: path.resolve(__dirname, page),
	page: path.basename(page).replace('.html', '')
})))

const getIcons = globby([ path.resolve(_dir, 'templates/icon/*.html') ]).then(function (icons) {
  return icons.map(function (icon) {
    return {
      type: 'template',
      fileName: path.resolve(__dirname, icon),
      page: 'icon/' + path.basename(icon).replace('.html', '')
    }
  })
})

// Generate page objects
Promise.all([
	Promise.resolve(index),
  getTemplates,
  getCSS,
	getJS,
	getPages,
	getIcons
]).then((confs) => {
  confs = _.flatten(confs)

	// Login to the iGEM wiki
	console.log('Please log in to your iGEM account to upload files:')
  igemwiki.login().then((jar) => {
    confs = confs.map(c => ({
      jar: jar,
      type: c.type,
      dest: c.page,
      source: c.fileName,
      // force: true
    }))

		// Upload pages
		console.log('Started uploading files...')
    Promise.map(confs, conf => igemwiki.upload(conf), { concurrency: 1 })
      .then(() => console.log('Uploads completed'))
		  .catch(console.error)
  })
})