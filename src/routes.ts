import {Request, Response, Router} from "express"
import { Readable } from "stream"
import readline from "readline"
import multer from "multer"

const multerConfig = multer();
const router = Router();

interface Car {
  marca: string;
  modelo: string;
  categoria: string;
  cor:string;
}

router.post("/cars", multerConfig.single("file"), async (request: Request, response: Response) => {
  
  const { file } = request
  const readableFile = new Readable()
  readableFile.push(  file?.buffer)
  readableFile.push(null)

  const carLine = readline.createInterface({
    input: readableFile
  })

  const cars: Car[] = []

  for await (let line of carLine){
    const carProperty = line.split(',')
    cars.push({
      marca: carProperty[0],
      modelo: carProperty[1],
      categoria: carProperty[2],
      cor:carProperty[3],
    })
  }

  return response.json(cars)
})

export { router };