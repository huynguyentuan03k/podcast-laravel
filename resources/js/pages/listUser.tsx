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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import axios, { AxiosError } from "axios";


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

  return (
    
    <AppLayout breadcrumbs={[{ title: "Users", href: "/users" }]}>
      <div className="p-4">
           <Button>
            <Link href="/createUser">Create User</Link>
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
                  <button onClick={() => console.log("Edit", user.id)}>
                    <Edit className="inline-block h-4 w-4" />
                  </button>
                  <button onClick={() => console.log("Delete", user.id)}>
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
