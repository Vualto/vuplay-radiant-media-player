module.exports = function(grunt) {
    grunt.initConfig({
        package: grunt.file.readJSON("package.json"),

        clean: ["dist/*"],
        copy: {
            all: {
                expand: true,
                src: [
                    "index.html",
                    "src/vuplay-rmp.js",
                    "assets/vuplay_poster.png",
                ],
                dest: "dist/",
                flatten: true,
            },
        },
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ["**/*.js", "./index.html"],
                tasks: ["build"],
                options: {
                    spawn: false,
                },
            },
        },
        connect: {
            server: {
                options: {
                    protocol: "https",
                    hostname: "radiant.media.player.local.vuplay.co.uk",
                    port: 14705,
                    base: "dist",
                    keepalive: true,
                },
            },
        },
        concurrent: {
            connectandwatch: {
                tasks: ["connect", "watch"],
                options: {
                    logConcurrentOutput: true,
                },
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-concurrent");

    grunt.registerTask("build", ["clean", "copy"]);
    grunt.registerTask("serve", ["build", "concurrent:connectandwatch"]);
};
