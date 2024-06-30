import fs from "fs"
import path from "path"

function fixupTypes() {
    try {
        const cwd = process.cwd()
        let lbTypeFile = path.join(cwd, "src", "types", "limabean.d.ts")
        if (fs.existsSync(lbTypeFile)) {
            let lbTypeContent = fs.readFileSync(lbTypeFile).toString()
            lbTypeContent = lbTypeContent.replace("export {}", "export type {}")
            fs.writeFileSync(lbTypeFile, lbTypeContent)
        }
    } catch (error) {
        console.error(error)
        return false
    }
    return true
}

fixupTypes()
