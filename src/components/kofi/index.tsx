import Image from "next/image";
import KofiLogo from "@/assets/images/icons/kofi-logo.png";
import Link from "next/link";

export default function Kofi() {
  return (
    <Link
      href={"https://ko-fi.com/scryptxz"}
      target="_blank"
      className="bg-[#13C3FF] fixed bottom-5 right-5 pr-4 pl-2 rounded-full opacity-50 hover:opacity-100 duration-200"
    >
      <Image
        src={KofiLogo}
        alt=""
        width={30}
        className="mr-2 inline align-middle"
      />
      <span className="font-semibold text-white text-sm">Support me!</span>
    </Link>
  );
}
