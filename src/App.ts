import "./App.css"
import limabeanImage from "./limabeans.png"

export const App = component<void>(async (render) => {
    render(() => {
        Div(() => {
            Img(limabeanImage, "Limabeans")
        }).className("Limabeans")

        H1("Welcome to Limabean!")

        Section(() => {
            P("Edit src/App.ts and save to reload.")
            P(() => {
                A("https://github.com/limabeans/limabean", "Learn more")
            })
        })
    })
})
