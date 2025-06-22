import { NextRequest, NextResponse } from "next/server";
import User from "@/models/Users";
import { ConnectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest){
    try {
        const { email, password } = await request.json();

        if(!email || !password){
            return NextResponse.json(
                { error: "Email and Password are required" },
                { status: 400 }
            )
        }

        await ConnectToDatabase()

        const existingUser = await User.findOne({ email });

         if(existingUser){
            return NextResponse.json(
                { error: "User allready register." },
                { status: 400 }
            )
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
            { error: "User Registration Successfull." },
            { status: 200 }
        )

    } catch (error) {
        console.log("Registraion Error", error)
        return NextResponse.json(
            { error: "Failed to Register user" },
            { status: 400 }
        )
    }
}