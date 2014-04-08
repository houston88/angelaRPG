module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concurrent: {
            dev: {
                //tasks: ['nodemon', 'watch'],
                tasks: ['execute', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        execute: {
            target: {
                src: ['app.js']
            }
        },

        //nodemon: {
        //    dev: {
        //        script: 'app.js'
        //    }
        //},

        browserify: {
            client: {
                src: ['js/game.js'],
                dest: 'lib/bundle.js'
            }
        },

        watch: {
            options: {
                livereload: true
            },
            files: ['js/*.js'],
            tasks: ['browserify']
        }

    });

    // All I want is to auto browserify with watch
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Can we also run our regular node app from here?
    //grunt.loadNpmTasks('grunt-nodemon');

    // Actually, just want to run node, not monitor it
    grunt.loadNpmTasks('grunt-execute');

    // Run nodemon and watch concurrently
    grunt.loadNpmTasks('grunt-concurrent');

    // Default task(s).
    grunt.registerTask('default', ['browserify', 'concurrent:dev']);

};