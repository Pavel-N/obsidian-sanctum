import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import process from "process";
import { config } from "dotenv";

config();

const prod = process.argv[2] === "production";

/** This determines where the output file goes.
 * npm run dev will put it in OUTDIR specified in your .env
 * npm run build will place it in the build directory in this repository.
 */
const dir = prod ? "./build" : process.env.OUTDIR;
const file = `${dir}/beta.css`;
const banner = `/* ─────────────────────────────────────────────────────────────────────────
Sanctum for Obsidian.md
Version 0.6.0
created by @jdanielmourao (Github)

Sponsor my work:
https://ko-fi.com/jdanielmourao
https://paypal.me/jdanielmourao

Readme:
https://github.com/jdanielmourao/obsidian-sanctum

Forum Thread:
https://forum.obsidian.md/t/sanctum-theme/25455

Description:
Sanctum’s a minimalist theme with the aim of creating a serene space of retreat, for thought and uninterrupted work.

Disclaimer:
This theme is designed to be used with the Style Settings plugin.

MIT License

Copyright (c) 2021-2022 José Daniel Mourão (jdanielmourao)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

───────────────────────────────────────────────────────────────────────── */`;

esbuild
    .build({
		banner: {
			css: banner
		},
        /** Entry point should be where everything is imported into. */
        entryPoints: ["scss/base.scss"],
        /** npm run dev will watch for file changes and rebuild instantly. */
        watch: !prod,
		minify: false,
        logLevel: "info",
        plugins: [sassPlugin()],
        outfile: file
    })
    .catch(() => process.exit(1));
