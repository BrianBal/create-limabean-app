import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"

export default [
    { files: ["**/*.{js,mjs,cjs,ts}"] },
    {
        ignores: ["**/*.d.ts", "dist/**", "node_modules/**", "vite.config.ts"],
    },
    { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
]
