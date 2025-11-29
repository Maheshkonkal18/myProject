import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

const LostForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    contactInfo: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await api.post("/lost", form);
      setSuccess("Lost item reported successfully.");
      setTimeout(() => navigate("/lost"), 600);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 px-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Report Lost Item
      </h2>
      {error && (
        <div className="text-xs text-red-600 mb-3 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
      {success && (
        <div className="text-xs text-green-700 mb-3 bg-green-50 border border-green-200 rounded p-2">
          {success}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-3 text-sm bg-white p-4 border border-gray-200 rounded-lg">
        <div>
          <label className="block text-gray-700 mb-1">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-2 py-1 min-h-[70px]"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Date Lost</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Contact Info</label>
          <input
            name="contactInfo"
            value={form.contactInfo}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Phone, email, etc."
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LostForm;
