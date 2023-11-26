import {Button, Card, Divider, Text, TextInput} from "@tremor/react";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useAdminContext} from "../Context/AdminContext";
import {Link} from "react-router-dom";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

export default function Settings() {
  const {companyData, getCompanyData} = useAdminContext();

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    companyName:"",
    AdminName:"",
    GSTNo:"",
    businessAddress: "",
    businessPhoneNumber:"",
    adminPhoneNumber:"",
    isProfileUpdate: false,
    isCompanyLogoUpdate: false,
  });
  const [profileImg, setProfileImg] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);

  const handleCompanyDetail = async () => {
    setIsLoading(true)
    const API = `${import.meta.env.VITE_SERVER_API}/api/company/create-company`;
    const formData = new FormData();
    formData.append("companyName", data.companyName);
    formData.append("AdminName", data.AdminName);
    formData.append("GSTNo", data.GSTNo);
    formData.append("businessAddress", data.businessAddress);
    formData.append("businessPhoneNumber", data.businessPhoneNumber);
    formData.append("adminPhoneNumber", data.adminPhoneNumber);
    formData.append("images", profileImg);
    formData.append("images", companyLogo);

    try {
      const res = await axios.post(API, formData);
      if (res) {
        getCompanyData();
        toast.success("Details Saved.")
        setIsLoading(false) 
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  const handleUpdateComapny = async () => {
  setIsLoading(true)
    const API = `${
      import.meta.env.VITE_SERVER_API
    }/api/company/update-company/${companyData[0]._id}`;
    const formData = new FormData();
    formData.append("companyName", data.companyName);
    formData.append("AdminName", data.AdminName);
    formData.append("GSTNo", data.GSTNo);
    formData.append("businessAddress", data.businessAddress);
    formData.append("businessPhoneNumber", data.businessPhoneNumber);
    formData.append("adminPhoneNumber", data.adminPhoneNumber);
    formData.append("images", profileImg);
    formData.append("images", companyLogo);
    formData.append("isProfileUpdate", data.isProfileUpdate);
    formData.append("isCompanyUpdate", data.isCompanyLogoUpdate);
    try {
      const res = await axios.put(API, formData);
      if (res) {
        getCompanyData();
        toast.success("Details Updated.")
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  useEffect(()=>{
    try {
      getCompanyData()
    } catch (error) {
      console.log(error)
    }
  },[])
  
  

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="px-8 py-7 pl-72 w-[100vw]">
          <div>
            <h1 className="text-2xl font-semibold">
              Manage your company settings
            </h1>
            <h6 className="text-sm font-normal text-gray-600">
              This is where you will manage all company details and invoicing
              details
            </h6>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-6 mt-10">
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="object-cover overflow-hidden border-2 rounded-full h-28 w-28 border-tremor-border">
                  {companyData.length !== 0? (
                    <img
                      src={companyData[0].profileImg[0]}
                      className="w-full h-full"
                    />
                  ) : (
                    <img
                      src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                      className="w-full h-full"
                    />
                  )}
                </div>
                <Text>Profile photo</Text>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="object-cover overflow-hidden border-2 rounded-full h-28 w-28 border-tremor-border">
                  {companyData.length !== 0? (
                    <img
                      src={companyData[0].companyLogo[0]}
                      className="w-full h-full"
                    />
                  ) : (
                    <img
                      src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                      className="w-full h-full"
                    />
                  )}
                </div>
                <Text>Company logo</Text>
              </div>
            </div>
            <div className="w-full mt-4">
              <Text className="text-xl font-semibold">Company Details</Text>
              <Divider className="mt-2" />
            </div>
            <div className="flex flex-col gap-2 mt-4 w-max">
              <div className="flex items-center justify-center gap-2">
                <Text className="w-64 text-lg font-normal">Company name</Text>
                <TextInput
                  placeholder="Enter company name here"
                  name="companyName"
                  
                  value={
                    companyData
                      ? companyData[0]?.companyName
                      : data.companyName
                  }
                  
                  
                  onChange={(e) =>
                    setData((prev) => {
                      return {
                        ...prev,
                        companyName: e.target.value,
                      };
                    })
                  }
                ></TextInput>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Text className="w-64 text-lg font-normal">Admin name</Text>
                <TextInput
                  placeholder="Enter your name"
                  defaultValue={
                    companyData.length !=0
                      ? companyData[0].AdminName
                      : data.AdminName
                  }
                  value={
                    companyData.length !=0
                      ? companyData[0].AdminName
                      : data.AdminName
                  }

                  onChange={(e) =>
                    setData((prev) => {
                      return {
                        ...prev,
                        AdminName: e.target.value,
                      };
                    })
                  }
                ></TextInput>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Text className="w-64 text-lg font-normal">GST Number</Text>
                <TextInput
                  placeholder="Enter your GST number"
                  type="text"
                  defaultValue={
                    companyData.length !==0? companyData[0].GSTNo : data.GSTNo
                  }
                  value={
                    companyData.length !==0? companyData[0].GSTNo : data.GSTNo
                  }
                  onChange={(e) =>
                    setData((prev) => {
                      return {
                        ...prev,
                        GSTNo: e.target.value,
                      };
                    })
                  }
                ></TextInput>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Text className="w-64 text-lg font-normal">
                  Business Address
                </Text>
                <TextInput
                  placeholder="Enter your business address"
                  defaultValue={
                    companyData.length !==0
                      ? companyData[0].businessAddress
                      : data.businessAddress
                  }
                  value={
                    companyData.length !==0
                      ? companyData[0].businessAddress
                      : data.businessAddress
                  }
                  onChange={(e) =>
                    setData((prev) => {
                      return {
                        ...prev,
                        businessAddress: e.target.value,
                      };
                    })
                  }
                ></TextInput>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Text className="w-64 text-lg font-normal">
                  Business phone number
                </Text>
                <TextInput
                  placeholder="Enter your business phone number"
                  type="number"
                  defaultValue={
                    companyData.length !==0
                      ? companyData[0].businessPhoneNumber
                      : data.businessPhoneNumber
                  }
                  value={
                    companyData.length !==0
                      ? companyData[0].businessPhoneNumber
                      : data.businessPhoneNumber
                  }
                  onChange={(e) =>
                    setData((prev) => {
                      return {
                        ...prev,
                        businessPhoneNumber: e.target.value,
                      };
                    })
                  }
                ></TextInput>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Text className="w-64 text-lg font-normal">
                  Admin phone number
                </Text>
                <TextInput
                  placeholder="Enter your phone number"
                  type="number"
                  defaultValue={
                    companyData.length !==0
                      ? companyData[0].adminPhoneNumber
                      : data.adminPhoneNumber
                  }
                  value={
                    companyData.length !==0
                      ? companyData[0].adminPhoneNumber
                      : data.adminPhoneNumber
                  }
                  onChange={(e) =>
                    setData((prev) => {
                      return {
                        ...prev,
                        adminPhoneNumber: e.target.value,
                      };
                    })
                  }
                ></TextInput>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Text className="w-64 text-lg font-normal">Profile Image</Text>
                <TextInput
                  placeholder="Enter your phone number"
                  type="file"
                  name="images"
                  onChange={(e) => {
                    setProfileImg(e.target.files[0]);
                    setData((prev) => {
                      return {
                        ...prev,
                        isProfileUpdate: true,
                      };
                    });
                  }}
                ></TextInput>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Text className="w-64 text-lg font-normal">Company Logo</Text>
                <TextInput
                  placeholder="Enter your phone number"
                  type="file"
                  name="imaggges"
                  onChange={(e) => {
                    setCompanyLogo(e.target.files[0]);
                    setData((prev) => {
                      return {
                        ...prev,
                        isCompanyLogoUpdate: true,
                      };
                    });
                  }}
                ></TextInput>
              </div>
              <div className="flex items-center justify-center gap-4 mt-6">
                {companyData.length !== 0 ? (
                  <Button onClick={() => handleUpdateComapny()}>Edit</Button>
                ) : (
                  <Button onClick={() => handleCompanyDetail()}>Save</Button>
                )}
                <Link to="/">
                  <Button variant="secondary">Cancel</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
