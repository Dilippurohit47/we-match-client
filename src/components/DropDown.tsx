import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { backIn } from "framer-motion"
import { backendUrl } from "@/helper"
import { useContext } from "react"
import { AuthContext } from "@/AuthContext"


const DropDown = () => {
const {refreshUser} = useContext(AuthContext)
  const logout =async() =>{
try {
  const response = await fetch(`${backendUrl}/api/v1/auth/logout`,{
    method:"POST",
    credentials:"include"
  })
  if(response.ok){
    console.log("logout success full")
    refreshUser()
  }
} catch (error) {
  console.log(error)
}


  }
  return <DropdownMenu  >
  <DropdownMenuTrigger className="cursor-pointer">
                    <Avatar> 
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent >
    <DropdownMenuLabel >My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="cursor-pointer" >Profile</DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer" >Billing</DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer" onClick={()=>logout()}>logout</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
}

export default DropDown
