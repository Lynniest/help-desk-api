import { findAllRecords } from "@/app/lib/functions";
import { NextResponse } from "next/server";

export async function GET(){
    const records = await findAllRecords('ticket');
    return NextResponse.json(records);
}
