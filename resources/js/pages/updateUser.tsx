import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import {useForm} from "react-hook-form"
export default function UpdateUser(){

interface FormValues{
    name: string,
    email: string,
    email_verified_at: string,
    remember_token: string,
}

    const {register, reset, handleSubmit, formState:{errors}} =
    useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            email_verified_at: "",
            remember_token: ""
        }
    })

    return(
        <AppLayout>
            <Card>
                
                <CardHeader>
                    <CardTitle>title Card</CardTitle>
                    <CardDescription>this is a page update information user</CardDescription>
                </CardHeader>

                <CardContent>
                    {/* field name */}
                    <div>
                        <label htmlFor="">name</label>
                        <Input
                        {
                            ...register("name",{
                                required:"username khong duoc bo trong",
                                minLength:{
                                    value:4,
                                    message: "username khong duoc nho hon 4"
                                }
                            })
                        }
                        placeholder="nguyen van a"
                        />
                    </div>
                    
                </CardContent>
                
                <CardFooter>
                    <span>Footer Card</span>
                </CardFooter>


            </Card>
        </AppLayout>
    )
}