import { BsSearch } from "react-icons/bs";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between px-8 items-center py-4">
        <h1 className="font-black text-lg">Odyssey</h1>
        <BsSearch size="1.125rem" />
      </nav>
      <hr />
    </>
  );
}
