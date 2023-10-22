import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert("Please fill in all fields before submitting.");
      return; 
    }

    const message = `Thank you for reaching out!\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    alert(message);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  return (
    <div id="contact-us" className="flex justify-around p-10 gap-x-4">
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-3xl pb-6">Contact Us</h1>
        <p className="">
          Need to get in touch with us? Either fill out the <br /> form with
          your inquiry or find the department
          <br /> email you'd like to contact below.
        </p>
      </div>
      <div className="">
        <form onSubmit={handleSubmit} className="w-[30rem] flex flex-col gap-y-4">
            <div className="flex flex-col">
              <label htmlFor="firstName">Full Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="pl-2 py-[6px] border-none text-black rounded-[4px]"
              />
            </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-2 py-[6px] text-black border-none rounded-[4px]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message">What can we help you with?</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="pl-2 py-[6px] border-none text-black rounded-[4px] "
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-4 text-white bg-[#347C00] hover:bg-[#2B6700] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[4px] text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
