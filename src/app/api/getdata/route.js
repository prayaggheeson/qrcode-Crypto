import UserModel from "@/app/models/users";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/DB/database";

export async function GET() {
  try {
    await connectDB();
    const getData = await UserModel.find();
    return new NextResponse(
      JSON.stringify({ message: "Data fetched successfully", getData }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse(
      JSON.stringify({ message: "Data fetch failed", error }),
      {
        status: 500,
      }
    );
  }
}
