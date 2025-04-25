import { Input } from "@/components/ui/input"
import AppLayout from "@/layouts/app-layout"
import {Form} from "@/components/ui/form"
const breadcrumbs = [
   {
    title : "Profile User",
    href: "/profile"
   }
]
export default function Profile() {
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <form>

            </form>
        <div>
            <h1>Profile</h1>
            <p>This is the profile page.</p>
            <p>Here you can view and edit your profile information.</p>
        </div>
        <Input/>
       
        </AppLayout>
    )
}