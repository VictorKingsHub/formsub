// app/components/MyForm.tsx
"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function MyForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSuccessMessage(null); // Clear success message on input change
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        setSuccessMessage("Form submitted successfully!"); // Set success message
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        console.error("Form submission failed.");
        setSuccessMessage("Form submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccessMessage("An error occurred during form submission.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold text-blue-600 text-center mb-6">
        Fill Out The Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none min-h-[100px]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>

      {successMessage && (
        <p
          className={`mt-4 text-center ${
            successMessage === "Form submitted successfully!"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {successMessage}
        </p>
      )}
    </div>
  );
}
