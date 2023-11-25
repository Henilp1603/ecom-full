import {Button, Dialog, Text, TextField, Flex, Tabs} from "@radix-ui/themes";
import {LogIn} from "lucide-react";
import {useAuthContext} from "../../Contexts/AuthContext";
import axios from "axios";
import {Await, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {useCookies} from "react-cookie";
import { Rating } from "@mui/material";
import { useProductContext } from "../../Contexts/ProductContext";


export default function AddReview({prodId}) {
  const clickRef = useRef(null);

  const {name, email, password} = useAuthContext();


  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="3">
          Add Review
        </Button>
      </Dialog.Trigger>

      <Dialog.Content
        style={{
          maxWidth: 350,
        }}
      >
        <Tabs.Root defaultValue="addReview">
          <Tabs.List
            size="2"
            className="flex items-center justify-center font-semibold transition-all"
          >
            
            <Tabs.Trigger value="addReview">Review</Tabs.Trigger>
          </Tabs.List>

          
          <Tabs.Content value="addReview">
            <AuthContent action="Add" prodId={prodId}  />
          </Tabs.Content>
        </Tabs.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function AuthContent({action, prodId}) {
    
    const [data,setdata]=useState({
        star:"",
        prodId:prodId,
        comment:""
    })

    const [cookie, setCookie] = useCookies(["token"]);

    const {getSingleProduct}=useProductContext()


    const handelAddReview=async()=>{
        const url=`${import.meta.env.VITE_SERVER_API}/api/product/ratings`
        const bodyData={
            comment:data.comment,
            prodId:prodId,
            star:parseInt(data.star)
                
        }
        
        try {
            const res=await axios.put(url,bodyData,{
                headers:{
                    Authorization:`Bearer ${cookie.token}`
                }
            })
            console.log(res)
            if (res.data) {
                getSingleProduct(`${
                    import.meta.env.VITE_SERVER_API
                  }/api/product/get-product/${prodId}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
  

  return (
    <div>
      <Flex direction="column" gap="4" mt="5">
        
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Comment
            </Text>
            <TextField.Input
              placeholder="Enter your name"
              name="name"
              onChange={(e)=>{
                setdata((prev)=>{
                    return{
                        comment:e.target.value
                    }
                })
              }}
            />
          </label>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Ratings
          </Text>
          <Rating  onChange={(e)=>setdata((prev)=>{
            return{
                ...prev,
                star:e.target.value
            }
          })} />

        </label>
        
      </Flex>

      <Flex gap="3" mt="6" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close>
          <Button onClick={()=>handelAddReview()}>{action}</Button>
        </Dialog.Close>
      </Flex>
    </div>
  );
}
