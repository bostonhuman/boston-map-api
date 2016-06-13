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
		concat: {
			options: {
			separator: ';',
    	},
		dist: {
			src: ['js/lib/jquery-2.2.4.min.js', 'js/lib/bootstrap.min.js', 'js/lib/knockoutjs-v3.4.0.js', 'oauth-signature/dist/oauth-signature.min.js', 'js/script.min.js', 'js/mobile.min.js'],
			dest: 'js/built-concat.min.js',
    		},
  		},
	});	
	grunt.registerTask('default', [
		'cssmin',
		'uglify',
		'concat'
	]);
};