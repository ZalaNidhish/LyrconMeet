const meetingmodel = require("../../../models/meetings");

export async function POST(req){
    const {fullname, email, phone, date, time} = await req.json();

    try {
        const newMeeting = new meetingmodel({
            fullname,
            email,
            phone,
            date,
            time
        })
        await newMeeting.save();
        return new Response(JSON.stringify({message: "Meeting scheduled successfully"}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({message: "Error scheduling meeting"}), {status: 500});
    }   
}

