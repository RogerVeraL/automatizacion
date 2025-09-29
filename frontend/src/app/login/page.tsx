"use client";

import { useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  OAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import Logo from "../../images/comfama_logo.png";
const Login = () => {
  const router = useRouter();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInWithMicrosoft = async () => {
    setAuthing(true);
    const provider = new OAuthProvider("microsoft.com");
    provider.setCustomParameters({
      prompt: "consent",
    });

    signInWithPopup(auth, provider)
      .then((response) => {
        console.log("Microsoft UID:", response.user.uid);
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
        setAuthing(false);
      });
  };

  const signInWithEmail = async () => {
    setAuthing(true);
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setAuthing(false);
      });
  };
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full flex items-center justify-center bg-white">
        <Image src={Logo} alt="Logo" width={450} height={100} />
      </div>

      <div className="w-1/2 h-full bg-white flex flex-col p-20 justify-center">
        <div className="w-full max-w-[450px] mx-auto bg-white rounded-xl p-10">
          <div className="w-full flex flex-col mb-10 text-[#ee2b7b]">
            <h3 className="text-4xl font-bold mb-2 text-center">
              Iniciar sesión
            </h3>
          </div>

          <div className="w-full flex flex-col mb-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black placeholder-[#F15894] py-2 mb-4 bg-transparent border-b border-[#ee2b7b] focus:outline-none focus:border-[#ee2b7b]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-black placeholder-[#F15894] py-2 mb-4 bg-transparent border-b border-[#ee2b7b] focus:outline-none focus:border-[#ee2b7b]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-[#ee2b7b] text-white font-semibold rounded-md p-4 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200"
            onClick={signInWithEmail}
            disabled={authing}
          >
            Log In With Email
          </button>

          {error && (
            <div className="text-red-500 my-4 text-center">{error}</div>
          )}

          <div className="w-full flex items-center justify-center my-6">
            <div className="flex-grow h-[1px] bg-gray-300" />
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-[1px] bg-gray-300" />
          </div>

          <button
            className="w-full bg-[#006FC9] text-white font-semibold rounded-md p-4 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200"
            onClick={signInWithMicrosoft}
            disabled={authing}
          >
            Log In With Microsoft
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
