const nodemailer = require("nodemailer");

async function sendMail({ to, subject, text }) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });
 const mailOptions = {
      from: `"Lyrcon Meet" <${process.env.EMAIL_USER}>`,
      to,
      subject: "🎉 Meeting Scheduled Successfully",
      html: `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        
        <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
          
          <!-- HEADER IMAGE -->
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" 
               alt="Meeting" 
               style="width:100%; height:200px; object-fit:cover;" />

          <!-- CONTENT -->
          <div style="padding:25px;">
            <h2 style="color:#333;">Hello ${name}, 👋</h2>

            <p style="color:#555; font-size:16px;">
              Your meeting has been successfully scheduled!
            </p>

            <!-- MEETING CARD -->
            <div style="background:#f1f5ff; padding:20px; border-radius:10px; margin:20px 0;">
              <h3 style="margin:0; color:#4f46e5;">📅 Meeting Details</h3>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
              <p><strong>Type:</strong> Online Meeting</p>
            </div>

            <!-- BUTTON -->
            <div style="text-align:center; margin-top:20px;">
              <a href="#" 
                 style="background:#4f46e5; color:white; padding:12px 25px; border-radius:8px; text-decoration:none; font-weight:bold;">
                 Join Meeting
              </a>
            </div>

            <p style="margin-top:25px; color:#777;">
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
