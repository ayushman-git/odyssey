import NeptuneImg from "@/assets/images/neptune.png";

export default function Home() {
  return (
    <div className="grid place-items-center">
      <div className="max-w-screen-lg w-full px-1 mt-48">
        <h1 className="text-3xl">I am a software engineer,</h1>
        <h2 className="text-5xl leading-tight font-semibold inline">
          stitching the seams of software with threads pulled from the cosmos{" "}
          <img
            src={NeptuneImg.src}
            className="w-10 h-10 align-middle inline-block"
          />
        </h2>
        <h3 className="text-2xl font-medium mt-4 text-blue-500">
          Bridging Worlds with Code and Stars.
        </h3>
        <section className="bg-gray-900 rounded-3xl text-white p-10 mt-40">
          <h1 className="text-3xl h-32">I am a software engineer,</h1>
        </section>
      </div>
    </div>
  );
}
