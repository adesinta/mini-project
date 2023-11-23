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
    <div id="contact-us" className="py-28 md:flex lg:flex lg:justify-around md:justify-around md:p-10 md:gap-x-4">
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-3xl pb-6 text-center md:text-start">Contact Us</h1>
        <p className="flex justify-center pb-10 md:pb-0 md:text-start md:justify-start">
          Need to get in touch with us? Either fill out the <br /> form with
          your inquiry or find the department
          <br /> email you'd like to contact below.
        </p>
      </div>
      <div className="flex justify-center md:flex ">
        <form onSubmit={handleSubmit} className="w-[20rem] md:w-[30rem] md:flex md:flex-col md:gap-y-4">
            <div className="flex flex-col">
              <label htmlFor="firstName">Full Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                autoComplete="off"
                onChange={handleChange}
                className="pl-2 py-[6px] text-black rounded-[4px]"
              />
            </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              autoComplete="off"
              onChange={handleChange}
              className="pl-2 py-[6px] text-black  rounded-[4px]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message">What can we help you with?</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="pl-2 py-[6px]  text-black rounded-[4px] "
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-4 text-white bg-[#347C00] hover:bg-[#2B6700] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[4px] text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
