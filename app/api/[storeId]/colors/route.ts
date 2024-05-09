import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";


export async function POST(
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try {
        const { userId } = auth();
        const body = await req.json()

        const {name, value} = body;


        if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
        }
        
        if(!name){
           return new NextResponse("name is required", { status: 400 });
        }
        if(!value){
           return new NextResponse("value URL is required", { status: 400 });
        }
        if(!params.storeId){
           return new NextResponse("storeId is required", { status: 400 });
        }
        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Unauthorised", {status: 403})
        }

        const colors = await prismadb.colors.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })

        return NextResponse.json(colors);
    } catch (error) {
        console.log('[COLORS_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};


export async function GET(
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try {


        if(!params.storeId){
           return new NextResponse("storeId is required", { status: 400 });
        }
        

        const colors = await prismadb.colors.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(colors);
    } catch (error) {
        console.log('[COLORS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};