module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'lib/**/*.js', 'test/spec/**/*.js']
        },
        jasmine_node: {
        },
        watch: {
            all: {
                files: ['src/**/*', 'tests/**/*'],
                tasks: ['default'],
                options: {
                    atBegin: true,
                    interrupt: true
                }
            }
        }
    });
    
    grunt.registerTask('default', ['jshint', 'jasmine_node']);
};
