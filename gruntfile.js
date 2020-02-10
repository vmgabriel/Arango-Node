module.exports = grunt => {
  "use strict";

  grunt.initConfig({
    ts: {
      app: {
        default : {
          tsconfig: './tsconfig.json',
          target: 'es3', //or es3
          module: 'commonjs', // To compile TypeScript using external modules like NodeJS
          fast: 'never', // You'll need to recompile all the files each time for NodeJS
          additionalFlags: '--resolveJsonModule'
        },
        files: [{
          src: ["src/\*\*/\*.ts"],
          dest: "./dist"
        }],
        options: {
          configuration: "./tsconfig.json",
          target: 'es3', //or es3
          module: 'commonjs', // To compile TypeScript using external modules like NodeJS
          fast: 'never', // You'll need to recompile all the files each time for NodeJS
          additionalFlags: '--resolveJsonModule',
          emitDecoratorMetadata: true
        }
      }
    },
    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ["src/\*\*/\*.ts"]
      }
    },
    watch: {
      ts: {
        files: ["src/\*\*/\*.ts"],
        tasks: ["ts", "tslint"]
      }
    },
    typedoc: {
      build: {
        options: {
          module: 'commonjs',
          target: 'es3',
          out: 'docs/',
          name: 'user-service'
        },
        src: 'src/**/*'
      }
    }// ,
    // obfuscator: {
    //   files: [
    //     './dist/**/*.js',
    //   ],
    //   entry: './dist/index.js',
    //   out: './dist/index.js',
    //   strings: true,
    //   root: __dirname
    // }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.registerTask("default", ["ts"]);
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-typedoc');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  // grunt.loadNpmTasks('grunt-obfuscator');

  grunt.registerTask("default", [
    "ts",
    "tslint",
    "typedoc",
    // "obfuscator"
  ]);

  // END GRUNT
};
