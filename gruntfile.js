module.exports = function (grunt) {

    grunt.initConfig({
        package: grunt.file.readJSON("package.json"),

        clean: ["dist/*"],
        copy: {
            all: {
                expand: true,
                src: ["index.html", "index.js"],
                dest: "dist/",
                flatten: true
            }
        },
        connect: {
            server: {
                options: {
                    protocol: "https",
                    hostname: "radiant.media.player.local.vuplay.co.uk",
                    port: 14705,
                    base: "dist",
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.registerTask("build", ["clean", "copy"]);
    grunt.registerTask("serve", ["build", "connect"]);
}