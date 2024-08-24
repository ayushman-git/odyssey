import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { BLUR_DATA_URLS } from "@/data/constants";
import { convertToSlug } from "@/utils";

export default function ArticleCard({ details }) {
  return (
    <Link href={`/${convertToSlug(details.type)}/${details.slug}`}>
      <article className="flex cursor-pointer gap-6 flex-col sm:flex-row shadow-md hover:shadow-lg rounded-xl overflow-hidden group transition duration-300 ease-in-out">
        <div className="relative sm:flex-[2] h-72 sm:h-auto">
          <Image
            src={details.cover_img}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            className="group-hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            alt="Cover Image"
          />
        </div>
        <div className="flex-1 sm:flex-[2] p-4">
          <h2 className="sm:text-lg text-3xl font-semibold">{details.title}</h2>
          <h3 className="uppercase sm:text-sm text-xl tracking-wide font-semibold mb-4 mt-1 text-gray-600">
            {details.type}
          </h3>
          <p className="sm:text-sm text-xl text-gray-500 leading-8">
            {details.introduction}
          </p>
          <footer className="flex justify-end items-center mt-2 cursor-pointer">
            <p className="text-sm">Read More</p>
            <BsArrowRight size="1.125rem" className="ml-2" />
          </footer>
        </div>
      </article>
    </Link>
  );
}
