module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.initConfig ({   	  
   		uglify: {
			my_target: {
				files: {
					'dist/js/script.min.js' : 'src/js/script.js',
					'dist/js/mobile.min.js': 'src/js/mobile.js'
				}
			}
		},
		cssmin: {
			target: {
				files: {
					'dist/css/style.min.css': 'src/css/style.css'
    			}
  			}
		},
		concat: {
			dist: {
			src: ['dist/js/lib/jquery-2.2.4.min.js', 'dist/js/lib/bootstrap.min.js', 'dist/js/lib/knockoutjs-v3.4.0.js', 'dist/oauth-signature/dist/oauth-signature.min.js'],
			dest: 'dist/js/built-concat.min.js',
    		},
  		},
	});	
	grunt.registerTask('default', [
		'cssmin',
		'uglify',
		'concat'
	]);
};