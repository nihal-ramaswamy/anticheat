import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/auth.slice";
import React, { useState } from "react";
import { signInWithEmailPassword } from "../../db/auth.db";

const SignUp = () => {

  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email == null || password == null) {
      return;
    }
    console.log(email, password);
    const res = await signInWithEmailPassword(email, password);
    if (res.status === "error") {
      console.log(res);
      return;
    }
    dispatch(setUser(res.data?.uid));
  };

  const handleEmailInput = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setEmail((e.target as HTMLInputElement).value);
  }

  const handlePasswordInput = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setPassword((e.target as HTMLInputElement).value);
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Log In</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onClick={(e) => handleEmailInput(e)}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onClick={(e) => handlePasswordInput(e)}
          />
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
            onClick={() => handleSubmit()}
          >Log In</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
