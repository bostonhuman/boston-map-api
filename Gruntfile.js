module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.initConfig ({   	  
   		uglify: {
			my_target: {
				files: {
					'js/script.min.js' : 'js/script.js',
					'js/mobile.min.js': 'js/mobile.js'
				}
			}
		},
		cssmin: {
			target: {
				files: {
					'css/style.min.css': 'css/style.css'
    			}
  			}
		},
	});	
	grunt.registerTask('default', [
		'cssmin',
		'uglify'
	]);
};