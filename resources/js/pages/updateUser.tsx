
import AppLayout from "@/layouts/app-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

type FormValues = {
  email: string;
  name: string;
  password?: string;
};

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", name: "", password: undefined },
  });

  // Fetch user data and populate form
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users/${id}`);
        const { email, name } = response.data;
        reset({ email, name, password: "" });
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
      await axios.put(`/api/users/${id}`, data);
      alert("User updated successfully");
      router.push("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
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
    <AppLayout breadcrumbs={[
      { title: "Users", href: "/users" },
      { title: "Edit User", href: `/users/edit/${id}` },
    ]}>
      <div className="p-4 max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
            <CardDescription>Update user information below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Name</label>
                <Input
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Name must be at least 3 characters" },
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">New Password</label>
                <Input type="password" {...register("password")} placeholder="Leave blank to keep unchanged" />
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.push("/users")}>Cancel</Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
