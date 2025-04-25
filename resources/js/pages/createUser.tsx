import AppLayout from "@/layouts/app-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudCog } from "lucide-react";
import api from "@/lib/axios"
import axios, { AxiosError } from "axios";


interface FormValues {
  email: string;
  name: string;
  password: string;
}

export default function CreateUserPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", name: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try{
        const response = await api.post("/api/users",data);
        if(response.data){
            alert("user created: ")
        }
        reset();
        console.log("user created: ", response.data)
    }catch(e){
        if(axios.isAxiosError(e)){
            // here server return error
            console.log("this is a response error ",e.response)
            alert(e.response?.data.message)      
        }else{
            // another error
            console.log("unexpected error: ",e)
        }

    }
    console.log("Form submitted:", data);
    // gọi API ở đây...
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Create User", href: "/user-create" }]}>
        <Card className="">
           
            
            <CardHeader>
            <CloudCog/>
            <CardTitle>this is a card title</CardTitle>
            <CardDescription>description card</CardDescription>
            </CardHeader>


            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* field email */}
                    <div>
              <label className="block text-sm font-medium">Email</label>
              <Input
                {
                ...register("email", {
                  required: "Email không được để trống",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email không hợp lệ",
                  },
                }
                ) 
                }
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>


                {/* field username */}
                <div>
                    <label htmlFor="">username</label>
                    <Input
          
                    {
                    ...register("name",{
                        required: "username khong duoc bo trong",
                        minLength:{
                            value:4,
                            message: "username khong duoc nho hon 4"
                        }
                    })
                    }
                    placeholder="nguyenvana"
                    />
                    {errors.name && (<p className="mt-1 text-xs text-red-600">{errors.name.message}</p>)}
                </div>


   {/* field password */}
   <div>
                    <label htmlFor="">password</label>
                    <Input
                    type="password"
                    {
                    ...register("password",{
                        required: "mat khau khong duoc bo trong",
                        minLength:{
                            value:8,
                            message: "mat khau khong duoc nho hon 8 ky tu"
                        }
                    })
                    }
                    />
                    {errors.password && (<p className="mt-1 text-xs text-red-600">{errors.password.message}</p>)}
                </div>

                    <Button type="submit">Create User</Button>
                </form>
            </CardContent>


            <CardFooter>
                <span>email is required.</span>
            </CardFooter>

        </Card>
 
    </AppLayout>
  );
}
