const meetingmodel = require("../../../models/meetings");
const sendMail = require("../../../lib/mailer");
const dotenv = require("dotenv").config();
const { connectDB } = require("../../../lib/db");

export async function POST(req) {
  await connectDB();

  const { fullname, email, phone, date, time } = await req.json();

  const existingMeeting = await meetingmodel.findOne({ date, time });

  if (existingMeeting) {
    return new Response(
      JSON.stringify({ message: "Meeting slot already booked" }),
      { status: 400 }
    );
  }

  try {
    // FIX: added await
    const newMeeting = await meetingmodel.create({
      fullname,
      email,
      phone,
      date,
      time,
    });

    // user mail
    await sendMail({
      to: email,
      subject: "🎉 Meeting Scheduled Successfully",
      name: fullname,
      date,
      time,
      text: `Hi ${fullname}, your meeting is scheduled on ${date} at ${time}`,
    });

    // admin mail
    await sendMail({
      to: process.env.EMAIL_USER,
      subject: "📢 New Meeting Booked",
      name: "Admin",
      date,
      time,
      text: `New meeting booked by ${fullname} (${email}, ${phone}) on ${date} at ${time}`,
    });

    return new Response(
      JSON.stringify({ message: "Meeting scheduled successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    return new Response(
      JSON.stringify({ message: "Error scheduling meeting" }),
      { status: 500 }
    );
  }
}