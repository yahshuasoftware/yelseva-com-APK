import axios from "axios";
const backendDomain=  "http://192.168.31.163:8080";

export const SignIn = async (email, password, district, state) => {
  try {
    const response = await fetch(`${backendDomain}/app/api/login`,{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            email,
            password,
            state,
            district,
          }),
    });
    const responseData = await response.json();
    return responseData;
  }catch (error){
    console.error("Login API Error:", error);
  }
  };
  