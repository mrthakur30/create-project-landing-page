// Importing images
import image1 from "../assets/offerings/1.webp";
import image2 from "../assets/offerings/2.webp";
import image3 from "../assets/offerings/3.webp";
import image4 from "../assets/offerings/4.webp";
import image5 from "../assets/offerings/5.webp";
import image6 from "../assets/offerings/6.webp";

// Offerings data
export const whatWeOffer = [
  {
    text: "END TO END DESIGN SOLUTION",
    image: image1,
  },
  {
    text: "2D WORKING DRAWING",
    image: image2,
  },
  {
    text: "BOQ & COSTING",
    image: image3,
  },
  {
    text: "CUSTOM PRODUCT DESIGN",
    image: image4,
  },
  {
    text: "360 DEGREE VIEW",
    image: image5,
  },
  {
    text: "3D RENDERED DESIGN",
    image: image6,
  },
];

const Offerings = () => {
  return (
    <div className="py-10 bg-[#01382A] w-full text-white">
      <h1 className="font-bold md:text-[45px] text-white text-[28px] text-center mb-10 w-fit mx-auto">
      WHAT WE OFFER
      </h1>

      <div className="grid md:grid-cols-6 grid-cols-2 gap-8 justify-items-center p-4 md:px-10">
        {whatWeOffer.map((item, index) => (
          <div
            key={index}
            className="card w-44  flex flex-col items-center bg-[#014D39] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={item.image}
              alt={item.text}
              className="h-24 object-contain mt-4"
            />
            <h1 className="text-lg py-4 font-semibold text-center px-2">
              {item.text}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offerings;
