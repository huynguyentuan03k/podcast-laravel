"use client";

import AppLayout from "@/layouts/app-layout";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import axios, { AxiosError } from "axios";
import { router } from "@inertiajs/react";


type User = {
  id: string;
  name: string;
  email: string;
};

export default function UserList() {
    
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<boolean>(true);
    const [loading, setLoading] = useState<String | null>(null);

    useEffect(()=>{
    
        async function getAll(){
            try {
                const response = await axios.get("/api/users")
                if(response.data){
                    setUsers(response.data);
                }else{
                    console.log("not found data");
                }
                                    
                console.log(response)
            } catch (error) {
                console.log("Unexpected error ",error)
            }

        }
        getAll()
    },[])

    const handleEdit = (id: string) => {
      // Navigate to edit page with user ID
      router.visit(`/users/edit/${id}`);
    };

    const handleCreateUser = () => {
      router.visit('/createUser')
    }

    const handleDelete = async (id: string) =>{
      try {     
        console.log("delete user "+id)
        if(confirm("are you sure delete user ?")){
            const response = await axios.delete(`/api/users/${id}`)
            if(response.data){
                setUsers(users.filter((u) => u.id !== id));
            }
            console.log(response.data)
        }
      } catch (error) {
        console.error("error delete user : ", error)
      }
    }

  return (
    
    <AppLayout breadcrumbs={[{ title: "Users", href: "/users" }]}>
      <div className="p-4">
         <Button onClick={ () => handleCreateUser()}>
              create user
         </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="space-x-2">

                  <button onClick={()=> handleEdit(user.id)}>
                    <Edit className="inline-block h-4 w-4" />
                  </button>

                  <button onClick={() => handleDelete(user.id)}>
                    <Trash2 className="inline-block h-4 w-4" />
                  </button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  );
}
