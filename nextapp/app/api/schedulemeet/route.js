const meetingmodel = require("../../../models/meetings");
const sendMail = require("../../../lib/mailer");

const dotenv = require("dotenv").config();

const connectDB = require("../../../lib/db");

export async function POST(req) {

connectDB();

  const { fullname, email, phone, date, time } = await req.json();

  const existingMeeting = await meetingmodel.findOne({ date, time });

  if (existingMeeting) {
    return new Response(
      JSON.stringify({ message: "Meeting slot already booked" }),
      { status: 400 },
    );
  }

  try {
    const newMeeting = meetingmodel.create({
      fullname,
      email,
      phone,
      date,
      time,
    });

    await sendMail({
      to: email,
      subject: "Meeting Scheduled",
      text: `Hi ${fullname}, your meeting is scheduled on ${date} at ${time}`,
    });

    // admin notification
    await sendMail({
      to: process.env.EMAIL_USER,
      subject: "Meeting Scheduled",
      text: `Hi Admin, a new meeting is scheduled on ${date} at ${time} by ${fullname}, (${email}, ${phone})`,
    });

    return new Response(
      JSON.stringify({ message: "Meeting scheduled successfully" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    return new Response(
      JSON.stringify({ message: "Error scheduling meeting" }),
      { status: 500 },
    );
  }
}
