import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import AppLayout from "@/layouts/app-layout"
import { router } from "@inertiajs/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
const breadcrumbs = [
   {
    title : "Profile User",
    href: "/profile"
   }
]
const handleNav = () =>{
    router.visit('/listUser')
}

interface userForm{
    email: string,
    password: string,
    email_verified_at: Date,
    remember_token: string ,
}


export default function Profile() {


    useEffect(() =>{
        axios.get("http://localhost:8000/sanctum/csrf-cookie")
        .then(() =>{
            axios.get("http://localhost:8000/api/profile",{withCredentials:true})
                .then(response =>{console.log("response from url /api/profile",response)})
                .catch(error =>{console.log("Unexpected error : ",error);})
        })
    },[])


    // null tuc la chua co du lieu
    const [user, setUser] = useState<userForm | null>(null)
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card>
                <CardHeader>
                    <CardTitle>title card</CardTitle>
                    <CardDescription>description about profile</CardDescription>
                </CardHeader>
                
                <CardContent>
                    <div>
                        <h1>Profile</h1>
                        {
                            user ? (
                                <>

                                <span>{user.email}</span>
                                <span>{user.email_verified_at.toString()}</span>
                                <span>{user.remember_token}</span>
                                </>
                            ):(
                                <span>loadding data</span>
                            )
                        }
                    </div>
                </CardContent>


                <CardFooter>
                    <p>footer</p>
                </CardFooter>

                <Button  className="w-40" onClick={()=> handleNav()}>
                        Back List Users
                </Button>

            </Card>
        </AppLayout>
    )
}