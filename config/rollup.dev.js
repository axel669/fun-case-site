import svelte from "rollup-plugin-svelte"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import del from "rollup-plugin-delete"
import html from "@rollup/plugin-html"

import tea from "@axel669/teascript/rollup"
import svelteTea from "@axel669/teascript/svelte"

import copy from "./plugins/copy.js"
import simpleLocation from "./plugins/simple-location"

import appInfo from "./app-info.js"
import template from "./html-template.js"

export default {
    input: "./src/main.js",
    output: {
        file: `./build/app-d${Date.now()}.js`,
        format: "iife",
    },
    plugins: [
        del({ targets: "./build/*" }),
        svelte({
            preprocess: svelteTea,
        }),
        tea,
        simpleLocation,
        resolve({
            extensions: [".js", ".svelte"]
        }),
        commonjs(),
        html({
            filename: "./build/index.html",
            title: appInfo.name,
            template,
        }),
        copy("static", "build")
    ]
}
