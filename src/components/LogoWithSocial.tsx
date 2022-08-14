import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

export const LogoWithSocial: React.FC = () => {
  return (
    <div>
      <img
        className="pointer-events-none select-none opacity-80"
        src="/logo-with-text.svg"
        alt="logo"
        width="100%"
        height="auto"
      />
      <div className="flex gap-10 justify-center">
        <a href="https://youtube.com/justinormousfpv">
          <AiFillYoutube size="80px" />
        </a>
        <a href="https://www.instagram.com/justinormousfpv">
          <AiFillInstagram size="80px" />
        </a>
        <a href="https://www.tiktok.com/@justinormousfpv">
          <FaTiktok size="80px" />
        </a>
      </div>
    </div>
  );
};
