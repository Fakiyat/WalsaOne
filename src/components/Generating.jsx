import { loading } from "../assets";
import OptimizedImage from "./OptimizedImage";

const Generating = ({ className }) => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base`}
    >
      <OptimizedImage className="w-5 h-5 mr-4" src={loading} alt="Loading" />
      We are always ready for you...
    </div>
  );
};

export default Generating;
