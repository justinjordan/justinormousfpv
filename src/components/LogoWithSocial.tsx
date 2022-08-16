import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

export const LogoWithSocial: React.FC = () => {
  return (
    <div className="max-w-full max-h-full">
      <div>
        <img
          className="pointer-events-none select-none m-h-full w-60 lg:w-[50rem] h-auto"
          src="/logo-with-text.svg"
          alt="logo"
        />
        <div className="flex gap-8 justify-center h-14">
          <a href="https://youtube.com/justinormousfpv">
            <AiFillYoutube size="100%" />
          </a>
          <a href="https://www.instagram.com/justinormousfpv">
            <AiFillInstagram size="100%" />
          </a>
          <a href="https://www.tiktok.com/@justinormousfpv">
            <FaTiktok size="100%" />
          </a>
        </div>
      </div>
    </div>
  );
};
