import { NextRequest } from 'next/server'
import jwt from "jsonwebtoken"

export default function getDataFromToken(request:NextRequest){
    try{
        const token=request.cookies.get('token')?.value||''
        const decodedToken:any=jwt.verify(token,process.env.TOKEN_SECRET!)
        return decodedToken.id
    }
    catch(err:any){
        console.log("Error extracting Data from Token"+err.message)
    }
}


