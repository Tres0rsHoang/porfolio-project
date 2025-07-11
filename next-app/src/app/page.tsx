import Image from "next/image";
import AboutMe from "./components/about_me";
import NavBar from "./components/navbar";
import ProfileInfo from "./components/profile_info";
import Project from "./components/project";

export default function Home() {
  return (
    <div className="homepage">
      <main className="relative w-full h-dvh justify-center items-center flex flex-col pt-5">
        <NavBar />
        <div className="content-container">
          <div className="profile-info">
            <ProfileInfo />
            <AboutMe />
            <Project />
          </div>
        </div>
      </main>
      <div className="bg-cover-container">
        <Image
          fill={true}
          src="/images/BackgroundImage.png"
          alt="Background Image"
          className="bg-image"
        />
      </div>
      <footer className=""></footer>
    </div>
  );
}
