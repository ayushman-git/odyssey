import { BLUR_DATA_URLS } from "@/data/constants";
import { convertToSlug } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function ArticleCard({ details }) {
  console.log({details})
  return (
    <Link href={`/${convertToSlug(details.type)}/${details.slug}`}>
      <article className="flex cursor-pointer gap-6">
        <div className="w-1/3 h-48 relative">
          <Image
            src={details.cover_img}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            alt="Cover Image"
          />
        </div>
        <div className="w-2/3">
          <h2 className="text-lg font-bold">{details.title}</h2>
          <h3 className="uppercase text-sm tracking-widest font-bold mb-4 mt-1 text-gray-600">
            {details.type}
          </h3>
          <p className="text-sm leading-6">{details.introduction}</p>
          <footer className="flex justify-end items-center mt-2 cursor-pointer">
            <p className="text-sm">Read More</p>
            <BsArrowRight size="1.125rem" className="ml-2" />
          </footer>
        </div>
      </article>
    </Link>
  );
}
