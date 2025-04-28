import AppLayout from "@/layouts/app-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudCog } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";

interface FormValues {
  email: string;
  name: string;
  password?: string;
}

export default function UpdateUserPage() {
     const { id } = usePage().props as {id : string}
      const [loading, setLoading] = useState(false);
    
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", name: "", password: "" },
  });

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users/${id}`);
        if(response.data) {
          const { email, name } = response.data;
          reset({ email, name, password: "" });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) fetchUser();
  }, [id, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      // Remove empty password if not changed
      if (!data.password) {
        delete data.password;
      }
      
      const response = await axios.put(`/api/users/${id}`, data);
      if(response.data) {
        alert("User updated successfully");
        router.visit("/listUser");
      }
    } catch (e) {
      if(axios.isAxiosError(e)) {
        // Here server returns error
        console.log("This is a response error", e.response);
        alert(e.response?.data.message);
      } else {
        // Another error
        console.log("Unexpected error:", e);
        alert("Failed to update user");
      }
    }
  };

  if (loading) {
    return (
      <AppLayout breadcrumbs={[{ title: "Edit User", href: `/users/edit/${id}` }]}>  
        <p className="p-4">Loading user data...</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={[{ title: "Update User", href: `/users/edit/${id}` }]}>
        <Card className="">
            <CardHeader>
              <CloudCog/>
              <CardTitle>Update User</CardTitle>
              <CardDescription>Update user information</CardDescription>
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
                        ...register("password", {
                            minLength:{
                                value:8,
                                message: "mat khau khong duoc nho hon 8 ky tu"
                            }
                        })
                        }
                        placeholder="Leave blank to keep unchanged"
                        />
                        {errors.password && (<p className="mt-1 text-xs text-red-600">{errors.password.message}</p>)}
                    </div>

                    <Button type="submit" className="mt-4">Update User</Button>
                </form>
            </CardContent>

            <CardFooter>
                <Button variant="outline" onClick={() => router.visit("/listUser")} className="mr-2">Cancel</Button>
                <span>Update user information.</span>
            </CardFooter>
            
        </Card>
    </AppLayout>
  );
}