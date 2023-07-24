import React from "react";
import WelcomePageS from "./WelcomePageS";
import WelcomePageC from "./WelcomePageC";
const HomeScreen = () => {
  console.log(localStorage.getItem("loginC"));
  if(localStorage.getItem("loginC")==='true') window.location.href="http://localhost:3000/company/Profile";
  if(localStorage.getItem("loginS")==='true') window.location.href="http://localhost:3000/student/Profile";
  return (
    <div className="text-dark d-flex justify-content-between" style={{height:'100vh',marginTop:'-1'}}>
      <WelcomePageC/> {/*Welcome page for Companies */}
      <WelcomePageS/> {/*Welcome page for Students */}
    </div>
  );
};

export default HomeScreen;
