import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";
import LoginModal from "../sections/LoginModal";
import { useState } from "react";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="flex gap-4 max-lg:justify-center max-lg:mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="boxy relative py-3 px-6 text-white font-semibold rounded-lg bg-white/10 border border-blue-500 shadow-lg backdrop-blur-md -webkit-backdrop-blur-md transition-all duration-300 hover:bg-blue-500/20"
          >
            Sign In / Sign Up
          </button>
        </div>
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">
              AI & Robotics
            </div>
            <h1 className="mb-6 h1 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              Amazingly simple
            </h1>
            <p className="max-w-440 mb-14 body-2 max-md:mb-10">
              We designed Anantrit to be innovative, intelligent, and seamlessly
              integrated—pushing the boundaries of robotics and AI to create
              smarter, more efficient solutions.
            </p>
            <LinkScroll to="features" offset={-100} spy smooth>
              <Button icon="/images/zap.svg">Join US</Button>
            </LinkScroll>
          </div>

          <div className="absolute -top-32 left-[calc(50%-340px)] w-[1230px] pointer-events-none hero-img_res">
            <img
              src="/images/hero.png"
              className="size-1230 max-lg:h-auto"
              alt="hero"
            />
          </div>
        </div>
      </Element>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;
