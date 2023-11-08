import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";

export default function ArticleCard({ details }) {
  console.log({details})
  return (
    <article className="flex">
      <Image
        src={details.cover_img}
        width={200}
        height={200}
        layout="responsive"
        className="mr-10 rounded"
        alt="Cover Image"
      />
      <div>
        <h2 className="text-lg font-bold">
          Looking through the lens of infrared
        </h2>
        <h3 className="uppercase text-sm tracking-widest font-bold mb-4 mt-1 text-gray-600">
          {details.type}
        </h3>
        <p className="text-sm leading-6">{details.introduction}</p>
        <footer className="flex justify-end items-center mt-2 cursor-pointer">
          <a className="text-sm">Read More</a>
          <BsArrowRight size="1.125rem" className="ml-2" />
        </footer>
      </div>
    </article>
  );
}
