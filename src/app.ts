import express, { Express, Request, Response } from "express"
import multer, { Multer } from "multer"

const app: Express = express()
app.use(express.static("src"))

const port = 3000

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./upload")
	},
	filename: (req, file, callback) => {
		const imageExt = file.originalname.split(".")
		const imageNewname = `upload-${Date.now()}.${imageExt[1]}`
		callback(null, imageNewname)
	},
})

const upload: Multer = multer({ storage })

app.get("/", (req: Request, res: Response) => {
	res.sendFile(__dirname + "/index.html")
})

app.post("/upload", upload.single("photo"), (req: Request, res: Response) => {
	res.status(200).json({ status: "uploaded" })
})

app.post("/upload1", upload.array("photos"), (req: Request, res: Response) => {
	res.status(200).json({ status: "uploaded" })
})

app.listen(port, () => console.log(`Server's running on port ${port}`))
