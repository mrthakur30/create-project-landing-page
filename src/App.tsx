import  { useState } from "react";
import Header from './components/Header';
import Form from './components/Form';
import Offerings from './components/Offerings';
import CustomerReviews from './components/Reviews';
import TextWIthBack from './components/TextWithBack';
import Image1 from "./assets/architecture/image1.png";
import Image2 from "./assets/architecture/image2.png";
import Image3 from "./assets/architecture/image3.png";
import Image4 from "./assets/architecture/image4.png";
import Image5 from "./assets/architecture/image5.png";
import Image6 from "./assets/architecture/image6.png";
import LeadModel from "./components/LeadModel";
import {  XCircleIcon } from "lucide-react";

const ArchitectureData = [
  {
    text: "Residential",
    back: Image1,
    desc: "We Design Memories where Dreams Find a Home"
  },
  {
    text: "Retail Spaces",
    back: Image2,
    desc: "Designing Spaces that Inspire Shopping Experiences."
  },
  {
    text: "Office Spaces",
    back: Image3,
    desc: "Creating Office Designs that Reflect Your Company's Vision and Values"
  },
  {
    text: "Apartment Complex",
    back: Image4,
    desc: "Designing Urban Sustainable Living, Where Comfort Meets Community"
  },
  {
    text: "Villas & Condos",
    back: Image5,
    desc: "Exquisite Living, Unmatched Elegance with Timeless Luxury Redefined"
  },
  {
    text: "Hospitality Spaces",
    back: Image6,
    desc: "Designing Memorable Experiences in Every Detail"
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-emerald-950">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex md:my-20 justify-center items-center md:flex-row flex-col py-12">
          <div className="text-left">
            <div className="max-w-3xl px-5">
              <h1 className="md:text-5xl text-3xl font-bold text-emerald-100">
                Transform Your Space, Elevate Your Life
              </h1>
              <p className="py-6 text-lg text-emerald-300">
                Innovative architecture design solutions tailored to your unique style and needs. <br /> Let's
                create your dream space together.
              </p>
              <div className="flex gap-4">
                <a href="https://www.designelementary.in" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Get Started</a>
                <a className="btn text-black btn-outline hover:bg-yellow-300 bg-yellow-200" onClick={toggleModal}>Learn More</a>
              </div>
            </div>
          </div>
          <div>
            <h1 className="md:text-[2.7rem] text-3xl md:mb-5 my-4 text-center font-bold text-yellow-200">
              Create Project Now!
            </h1>
            <Form />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full bg-emerald-900">
          <Offerings />
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-12">
          <div className="text-center">
            <h1 className="font-bold md:text-[45px] text-white text-[28px] text-center mb-10 w-fit mx-auto">
              Our Services
            </h1>
          </div>
          <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-5">
            {ArchitectureData.map((item, index) => {
              return <TextWIthBack {...item} key={index} clasName="w-full" />;
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-12 w-full bg-emerald-900">
          <div className="text-center">
            <h1 className="font-bold md:text-[45px] text-white text-[28px] text-center mb-10 w-fit mx-auto">
              What Our Clients Say
            </h1>
          </div>
          <div className="w-full">
            <CustomerReviews />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12">
          <div className="text-center">
            <h1 className="font-bold md:text-[45px] text-white text-[28px] text-center mb-10 w-fit mx-auto">
              Ready to Transform Your Space?
            </h1>
            <p className="py-4 text-lg text-emerald-300">
              Let's bring your vision to life. Contact us today for a free consultation.
            </p>
            <a className="btn btn-primary" onClick={toggleModal}>Get in Touch</a>
          </div>
        </section>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open bg-transparent">
          <div className="bg-transparent">

            <div className="modal-action">
              <button className="mb-4" onClick={toggleModal}>
                <XCircleIcon />
              </button>
            </div>
            <LeadModel />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer items-center p-4 bg-base-100 text-base-content border-t">
        <div className="items-center grid-flow-col">
          <p>© 2024 Design Elementary. All rights reserved.</p>
        </div>
        <div className="ml-auto grid-flow-col gap-4">
          <a className="link link-hover" href="#">Terms of Service</a>
          <a className="link link-hover" href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
