const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMail({ to, subject, text, name, date, time }) {
  const meetLink = process.env.MEET_LINK

  const mailOptions = {
    from: `"Lyrcon Meet" <${process.env.EMAIL_USER}>`,
    to,
    subject: subject,
    text: text,

    html: `
    <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
      
      <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
        
        <!-- LOGO HEADER -->
        <div style="text-align:center; padding:20px; background:#ffffff;">
          <img src="../../public/logo.png" 
               alt="Lyrcon Logo" 
               style="max-height:60px;" />
        </div>

        <!-- CONTENT -->
        <div style="padding:25px;">
          <h2 style="color:#333;">Hello ${name || "User"}, 👋</h2>

          <p style="color:#555; font-size:16px;">
            Your meeting has been successfully scheduled. Here are your details:
          </p>

          <!-- MEETING CARD -->
          <div style="background:#f1f5ff; padding:20px; border-radius:10px; margin:20px 0;">
            <h3 style="margin:0; color:#4f46e5;">📅 Meeting Details</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Platform:</strong> Google Meet</p>
            <p><strong>Guests:</strong> Darshan, Adit Vyas</p>
          </div>

          <!-- BUTTON -->
          <div style="text-align:center; margin-top:20px;">
            <a href="${meetLink}" 
               target="_blank"
               style="background:#4f46e5; color:white; padding:12px 25px; border-radius:8px; text-decoration:none; font-weight:bold; display:inline-block;">
               🚀 Join Meeting
            </a>
          </div>

          <!-- EXTRA INFO -->
          <div style="margin-top:25px; font-size:14px; color:#666;">
            <p>🔗 <strong>Meeting Link:</strong><br/>
            <a href="${meetLink}" style="color:#4f46e5;">${meetLink}</a></p>

            <p>⏰ Please join 5 minutes before the scheduled time.</p>
            <p>📌 Ensure a stable internet connection.</p>
          </div>

          <hr style="margin:25px 0; border:none; border-top:1px solid #eee;" />

          <p style="color:#777; font-size:14px;">
            Thanks for choosing <b>Lyrcon Solutions</b> 🚀
          </p>
        </div>

      </div>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent ✅");
}

module.exports = sendMail;