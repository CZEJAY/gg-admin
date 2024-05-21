import { cloudinary } from "@/lib/utils"
import {NextResponse} from "next/server"

export const POST = async (req: Request) => {
    const body = await req.json()
    try {
      const result = await cloudinary.uploader.upload(body, function (err: any, result: any){
            if(err) {
              console.log(err);
              return NextResponse.json({message: "Something went wrong."}, {status: 500})
            }
            return NextResponse.json({message: "Image uploaded", data: result})
        })
        if(result){
            return NextResponse.json({message: "Image uploaded", data: result})
        }
        return NextResponse.json({message: "Something went wrong."}, {status: 500})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong."}, {status: 500})
    }
}