import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

interface ExamplePageProps {
  data: string;
}

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <>
      <div className="w-full h-[100vh]">
        <img
          src="./AdobeStock_625078650-scaled.jpeg"
          className="w-full h-full"
          alt=""
        />
      </div>
    </>
  );
}
