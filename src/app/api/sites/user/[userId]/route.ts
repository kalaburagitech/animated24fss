import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ userId: string }>;
};

export async function GET(request: NextRequest, context: Params) {
  const { userId } = await context.params;
  const regionId = request.nextUrl.searchParams.get("regionId");

  return NextResponse.json({
    success: true,
    userId,
    regionId,
    sites: [],
    message: "No sites mapped for this user.",
  });
}
