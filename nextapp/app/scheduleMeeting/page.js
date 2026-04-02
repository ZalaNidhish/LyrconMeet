"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


export default function ScheduleMeet() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });

  const [loading, setloading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    async function fetchBookedSlots() {
      try {
        const res = await fetch("/api/getmeetslots");
        const data = await res.json();

        setBookedSlots(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.log(err);
        setBookedSlots([]);
      }
    }

    fetchBookedSlots();
  }, []);

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
  ];

  function isBooked(time) {
    return (
      Array.isArray(bookedSlots) &&
      bookedSlots.some((slot) => slot.date === form.date && slot.time === time)
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "date" && { time: "" }),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setloading(true);

    try {
      const res = await fetch("/api/schedulemeet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      const updated = await fetch("/api/getmeetslots");
      const updatedData = await updated.json();

      setBookedSlots(Array.isArray(updatedData.data) ? updatedData.data : []);
      setloading(false);

      console.log(data.status);
      toast.success(data.message);

      setForm({
        fullname: "",
        email: "",
        phone: "",
        date: "",
        time: "",
      });
    } catch (err) {
      setloading(false);
      alert("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Schedule Meeting
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Book your meeting with Lyrcon Solutions
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Phone number must be exactly 10 digits"
            className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />

          <div className="flex gap-4">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />

            <select
              name="time"
              value={form.time}
              required
              onChange={handleChange}
              disabled={!form.date}
              className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="">Select time</option>

              {timeSlots.map((slot) => {
                const booked = isBooked(slot);

                return (
                  <option
                    key={slot}
                    value={slot}
                    disabled={booked}
                    className={
                      booked ? "text-gray-400 bg-gray-100" : "text-black"
                    }
                  >
                    {booked ? `${slot} (Booked)` : slot}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-indigo-500 text-white p-3 rounded-xl font-semibold shadow-lg transition ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-indigo-600 active:scale-95"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Scheduling...
              </div>
            ) : (
              "Schedule Meeting"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
