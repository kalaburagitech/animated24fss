import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const organizationId = params.get("organizationId");
  const date = params.get("date");

  return NextResponse.json({
    success: true,
    organizationId,
    date,
    records: [],
    message: "No attendance records found.",
  });
}
