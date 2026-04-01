const meetingmodel = require("../../../models/meetings");
const { connectDB } = require("../../../lib/db");

export async function GET() {
  try {
    await connectDB();

    const meetings = await meetingmodel.find().sort({ date: -1 });

    // ✅ convert into array of objects
    const formatted = meetings.map((meet) => ({
      date: meet.date,
      time: meet.time,
    }));

    return new Response(
      JSON.stringify({
        success: true,
        count: meetings.length,
        data: formatted,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}