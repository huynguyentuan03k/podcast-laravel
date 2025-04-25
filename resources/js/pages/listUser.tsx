import AppLayout from "@/layouts/app-layout"
import {Table} from "@/components/ui/t"
export default function ListUser(){
    return(
        <AppLayout>
            <div>
                <Table>
                    <TableHeader>
                            <TableHead>Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Actions</TableHead>
                    </TableHeader>
                </Table>
            </div>
        </AppLayout>
    )
}