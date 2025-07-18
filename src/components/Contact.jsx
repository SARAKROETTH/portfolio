import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "sujata@jsmastery.pro",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <h3 className=" text-2xl font-bold">Get in <span className="text-yellow-600">touch</span></h3>
        <p className=" text-sm text-white/50">Have a project in mind interesting about me or just want to chat? Feel free to reach out directly or connect through my social channels.</p>
        <div className=" mt-2 flex gap-2 items-center justify-start"> 
          <i class="fa-solid fa-envelope"></i>
          <a href="mailto:sereysarakroetthbunroeun@gmail.com" className="text-center hover:text-yellow-600 cursor-pointer">sereysarakroetthbunroeun@gmail.com</a>
        </div>
        <div className=" mt-2 flex gap-2 items-center justify-start"> 
          <i class="fa-solid fa-phone"></i>
          <p className="text-center ">(+855)<span className=" hover:text-yellow-600 cursor-pointer"> 95471411</span></p>
        </div>
        <div className=" mt-2 flex gap-2 items-center justify-start"> 
          <i class="fa-solid fa-location-dot"></i>
          <p className="text-center hover:text-yellow-600 text-sm">SangKat Toek Tla,Khan Sen Sok,Phnom Penh , Cambodia </p>
        </div>
        <h3 className=" text-2xl text-center mt-4 font-bold">Connect with<span className="text-yellow-600"> Me</span></h3>
          <div className=" flex mt-6 mb-6 items-center justify-center gap-2 ">
            
            <a href="https://github.com/SARAKROETTH" className="group hover:bg-[#d09517] w-[30px] h-[30px] flex items-center justify-center border-2 border-[#d09517] rounded-[50%] p-[20px]">
               <i class="fa-brands text-[#bd850c] group-hover:text-white fa-github"></i>
            </a>
            <a href="https://web.facebook.com/retthyt.poss" className="group hover:bg-[#d09517] w-[30px] h-[30px] flex items-center justify-center border-2 border-[#d09517] rounded-[50%] p-[20px]">
               <i class="fa-brands group-hover:text-white text-[#d09517] fa-facebook-f"></i>
            </a>
            <a href="https://www.linkedin.com/in/bunroeun-sereysarakroetth-01780834a/" className="group hover:bg-[#d09517]  w-[30px] h-[30px] flex items-center justify-center border-2 border-[#d09517] rounded-[50%] p-[20px]">
               <i class="fa-brands group-hover:text-white text-[#d09517] fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/retthyt/" className="group hover:bg-[#d09517]  w-[30px] h-[30px] flex items-center justify-center border-2 border-[#d09517] rounded-[50%] p-[20px]">
               <i class="fa-brands group-hover:text-white text-[#d09517] fa-instagram"></i>
            </a>
           </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
