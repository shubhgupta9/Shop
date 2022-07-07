import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyAccount() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return <div></div>;
}

export default MyAccount;
