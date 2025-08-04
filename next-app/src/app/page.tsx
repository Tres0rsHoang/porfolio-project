import Image from "next/image";
import AboutMe from "../components/about_me/about_me";
import NavBar from "../components/navbar/navbar";
import ProfileInfo from "../components/profile_info/profile_info";
import Project from "../components/project/project";
import CommentSection from "@/components/comments/comments_section";
import ContactSection from "@/components/contact/contact_section";

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
            <ContactSection />
            <CommentSection />
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
