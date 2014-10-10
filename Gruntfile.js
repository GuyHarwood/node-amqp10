module.exports = function(grunt) {
    grunt.initConfig({
        simplemocha: {
            options: {
              globals: ['should'],
              timeout: 3000,
              ignoreLeaks: false,
              ui: 'bdd',
              reporter: 'list'
            },
            all: { src: ['test/**/*.js'] }
        },

        jshint: {
            all: [ 'Gruntfile.js', '*.js', 'lib/**/*.js']
        },

        jsdoc: {
            all: {
                src: ['amqp_client.js', 'lib/**/*.js'],
                dest: 'doc',
                template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                configure : "./jsdoc.conf.json"
            }
        },

        jsdoc2md: {
            indexed: {
                options: {
                    index: true
                },
                src: ['amqp_client.js', 'lib/**/*.js'],
                dest: 'api/with-index.md'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks("grunt-jsdoc-to-markdown");

    grunt.registerTask('test', ['simplemocha']);

    grunt.registerTask('default', ['jshint', 'test', 'jsdoc', 'jsdoc2md']);
};