import { execSync } from "child_process"
import path from "path"
import fs from "fs"

if (process.argv.length < 3) {
    console.log("You have to provide a name to your app.")
    console.log("For example :")
    console.log("    npx create-limabean-app my-app")
    process.exit(1)
}

const projectName = process.argv[2]
const currentPath = process.cwd()
const projectPath = path.join(currentPath, projectName)
const git_repo = "https://github.com/BrianBal/create-limabean-app.git"

try {
    fs.mkdirSync(projectPath)
} catch (err) {
    if (err.code === "EEXIST") {
        console.log(
            `The file ${projectName} already exist in the current directory, please give it another name.`
        )
    } else {
        console.log(err)
    }
    process.exit(1)
}

async function main() {
    try {
        console.log("Downloading files...")
        execSync(`git clone --depth 1 ${git_repo} ${projectPath}`)
        execSync("rm -rf .git", { cwd: projectPath })

        process.chdir(projectPath)

        console.log("Installing dependencies...")
        execSync("npm install")

        console.log("Updating package.json...")
        const packageJsonPath = path.join(projectPath, "package.json")
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

        // Remove bin attribute
        delete packageJson.bin

        // Update name to projectName
        packageJson.name = projectName

        // Update author with information from git
        try {
            const gitUserName = execSync("git config user.name")
                .toString()
                .trim()
            const gitUserEmail = execSync("git config user.email")
                .toString()
                .trim()
            packageJson.author = `${gitUserName} <${gitUserEmail}>`
        } catch (error) {
            console.log(
                "Unable to retrieve git user information. Skipping author update."
            )
        }

        // update package
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

        // remove generate-app.js
        fs.unlinkSync(path.join(projectPath, "generate-app.js"))

        // do first build so that types are generated
        execSync("npm run build", { cwd: projectPath })

        console.log("The installation is done, this is ready to use !")
    } catch (error) {
        console.log(error)
    }
}
main()
