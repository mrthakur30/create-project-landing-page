
export default function TextWIthBack(props: any) {
  return (
    <div >
      <div
        className={
          "relative h-[calc(2.5/6*100vh)] w-full overflow-hidden rounded-sm group " +
          props.clasName
        }

      >
        <img
          src={props.back}
          width={500}
          height={500}
          className="w-full h-full object-cover brightness-20 group-hover:scale-110 transition-all duration-500 ease-in-out"
          alt={props.text}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl md:text-4xl font-bold ">{props.text}</h1>
            {
              // Optional
              props.desc && (
                <p className="text-sm md:text-xl w-11/12 mx-auto">{props.desc}</p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
