const workboxBuild = require('workbox-build');
const BUILD_DIR = 'dist';
const SW = 'sw.js';

const input = {
    swDest: `${BUILD_DIR}/${SW}`,
    globDirectory: BUILD_DIR,
    globPatterns: [
        '**/*.{js,png,ico,svg,html,css}',
        //'assets/**/*'
    ],
    globIgnores: [],
    maximumFileSizeToCacheInBytes: 4000000
};

workboxBuild.generateSW(input).then(() => {
    console.log(`The service worker ${BUILD_DIR}/${SW} has been generated with a precache list.`);
});
