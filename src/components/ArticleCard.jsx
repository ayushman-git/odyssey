import Image from "next/image";
export default function ArticleCard() {
  return (
    <article className="flex">
      <Image
        src="https://c4.wallpaperflare.com/wallpaper/757/318/501/nasa-universe-james-webb-space-telescope-hd-wallpaper-preview.jpg"
        width={200}
        height={200}
        layout="responsive"
        className="mr-10 rounded"
      />
      <div>
        <h2 className="text-lg font-bold">
          Looking through the lens of infrared
        </h2>
        <h3 className="uppercase text-sm tracking-widest font-bold mb-4 mt-1">
          Case Study
        </h3>
        <p className="text-sm leading-6">
          In a world primarily perceived through the colors of the visible
          spectrum, there exists an intriguing dimension beyond what meets the
          human eye. Step into the extraordinary realm of infrared photography,
          where ordinary scenes and everyday objects transform into mesmerizing
          landscapes of hidden patterns and captivating mysteries. As we explore
          the fascinating world of infrared imaging, we'll uncover the science
          behind this captivating technology.
        </p>
        <footer className="flex justify-end mt-2">
          <a href="#" className="text-sm">Read More</a>
        </footer>
      </div>
    </article>
  );
}
