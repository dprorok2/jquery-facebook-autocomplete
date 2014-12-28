module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    less:
      all:
        options:
          yuicompress: true
          compress: false
        files:
          'demo/jquery-facebook-autocomplete.css': 'src/jquery-facebook-autocomplete.less'

    uglify:
      all:
        files:
          "demo/jquery-facebook-autocomplete.js": "src/jquery-facebook-autocomplete.js"

    connect:
      all:
        options:
          hostname: "localhost"
          port: 8001
          base: "demo"

    watch:
      less:
        files: ['src/*.less']
        tasks: ['less:all']
      js:
        files: ['src/*.js']
        tasks: ['uglify:all']

  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.registerTask 'default', ['less', 'uglify', 'connect', 'watch']
