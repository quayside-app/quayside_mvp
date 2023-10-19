import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import {User} from '../mongoModels';
import {URI} from '../mongoData.js';

export async function GET(request) {
    try {
        const params = await request.nextUrl.searchParams;
        const firstName = params.get("firstName");
        const lastName = params.get("lastName");

        // Require firstName and lastName
        if (!firstName || !lastName) {
        return NextResponse.json({ message: "User first name and last name required." }, { status: 400 });
        }

        if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);

        let users = await User.find({ firstName: firstName, lastName:lastName});
        return NextResponse.json({users}, {status:200});
        
    } catch (error) {
        return NextResponse.json({ message: 'Error getting data ' + error }, { status: 500 });
    }
}
