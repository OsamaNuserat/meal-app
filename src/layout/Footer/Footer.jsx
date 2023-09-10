import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/instagram.svg";

const Footer = () => {
  return (
    <footer className="bg-indigo-950 py-12 flex text-center relative z-10">
      <div className="container">
        <div className="flex justify-center mb-12">
          <img src="public/images/logo11.svg" alt="nada" className="h-7 w-auto bg-white" />
        </div>

        <div>
          <p className="text-white font-medium">
            Items availability, prices, participation, delivery areas and
            charges, purchase requirements for delivery may vary.
          </p>
        </div>

        <div className="flex justify-center mt-4 gap-10 align-items-center">
          <FacebookIcon className="w-12 h-12" />
          <TwitterIcon className="w-12 h-12" />
          <InstagramIcon className="w-12 h-12" />
        </div>
        <div className="flex justify-center align-items-center mt-4">
          <button>
            <img src="public/images/play-store.png" alt="Play Store" />
          </button>
          <button>
            <img src="public/images/apple-store.png" alt="Apple Store" />
          </button>
        </div>
        <div className="my-3">
          <p className="text-white">©EatMore, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
