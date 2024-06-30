import Unimport from "unimport/unplugin"
import { build } from "vite"

export default {
    plugins: [
        Unimport.vite({
            dts: "src/types/limabean.d.ts",
            presets: [
                {
                    package: "limabean",
                },
            ],
        }),
    ],
    build: {
        outDir: "./dist",
    },
}
