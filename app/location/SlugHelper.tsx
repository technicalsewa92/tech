import Categories from "@/components/repair/Categories";
import React from "react";
import parse from "html-react-parser";
const SlugHelper = (props:any) => {
  return (
    <>
      <div className="text-center md:px-8 px-3 mb-8">
        <Categories />
        <h1 className="bg-primary md:font-extrabold font-bold text-white md:text-2xl text-xl md:py-4 py-3 mb-2">
          {props?.location.toUpperCase()}
        </h1>
        <div className="text-left font-normal whitespace-pre-wrap blog-content">
          {props?.formatedDescription
            && 
            parse(props?.formatedDescription || "")
          
          }
        </div>
      </div>
    </>
  );
};

export default SlugHelper;
