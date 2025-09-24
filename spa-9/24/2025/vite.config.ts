// import replace from '@rollup/plugin-replace'

import {readFileSync} from "fs";
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import IconsResolver from "unplugin-icons/resolver";
import vueJsx from "@vitejs/plugin-vue-jsx";

import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
// import {splitVendorChunkPlugin} from 'vite'
import {alias} from "./vite.alias";

const packageJson = readFileSync('./package.json')
const {name, version} = JSON.parse(packageJson.toString())

const isProduction = process.env.NODE_ENV === 'production'


const define = {
    __PROJECT_NAME__: name,
    __VERSION__: JSON.stringify(version),
    __BUILD_TIME__: Date.now(),
    __IS_PROD__: isProduction,
} as any


const entryFileNames = assetInfo => {
    switch (assetInfo.name) {
        case 'preloader':
            return '[name].js'
        default :
            return 'assets/[name].[hash].js'
    }
}


const rootNames = {
    ['core/preloader.css']: true
}

const assetFileNames = ({name}) => {
    return rootNames[name] ? `[name].[ext]` : `assets/[name].[hash].[ext]`
}

const jsoned = {}
Object.keys(define).forEach((key) => {
    jsoned[key] = JSON.stringify(define[key])
})


const config = (args) => {
    return {
        output: "art/front",
        // define: jsoned,
        plugins: [
            vue({
                template: { transformAssetUrls }
            }),

            quasar(),
            Components({
                dts: true,
                dirs: ['app/view'],
                extensions: ['vue', 'jsx', 'tsx'],
                resolvers: [IconsResolver()]
            }),
            // splitVendorChunkPlugin(),
            vueJsx(),
            Icons({
                autoInstall: true,
                compiler: 'vue3'
            }),
            // replace(define),
        ],
        publicDir: 'public',
        resolve: {
            alias
        },
        css: {},
        build: {
            chunkSizeWarningLimit: 3000,
            outDir: "art/front",
            rollupOptions: {
                input: {
                    app: './app/app.ts',
                    'preloader': './core/preloader.ts',
                },
                output: {
                    entryFileNames,
                    assetFileNames,
                    manualChunks(id) {
                        if (id.includes('/node_modules/')) {
                            const modules = ['quasar', '@quasar', '@vue']
                            const chunk = modules.find((module) => id.includes(`/node_modules/${module}`))
                            return chunk ? `vendor-${chunk}` : 'vendor'
                        }
                    },
                },
            },

        },
    }

}

export default config
