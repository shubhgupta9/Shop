import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyAccount() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    }
  }, []);
  return <div></div>;
}

export default MyAccount;
