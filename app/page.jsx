 "use client";

import Hero from "./_components/hero"
import GlobalApi from "./_services/GlobalApi";
import CategoryList from "./_components/CategoryList";
import BusinessList from "./_components/BusinessList";
import React, { useEffect, useState } from "react";



const Home = () => {
  const [categoryList, setCategoryList] = useState([])
  const [businessList, setBusinessList] = useState([]);
 

  useEffect(() => {
    getCategoryList();
    getBusinessList();
  },[])


const getCategoryList = () => {
  GlobalApi.getCategory().then((resp) => {
   setCategoryList(resp.categories);
    console.log("console");
    console.log(resp);
  });
};

const getBusinessList = () => {
  GlobalApi.getBusinessList().then((response) =>{
    setBusinessList(response.businessLists);
    console.log("console");
    console.log(response);
  });
}

return (
  <div>
    <Hero />
    <div className="items-center">
    <CategoryList categoryList={categoryList} />

    </div>
    <BusinessList businessList={businessList} title={"Popular Services"} />
  </div>
);

};
export default  Home;