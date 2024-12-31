import Headers from "@/components/Headers";
import Loader from "@/components/ui-SVG/Loader";
import React from "react";

const loading = () => {
  return (
    <div>
      <Headers />
      
      <Loader />
    </div>
  );
};

export default loading;
