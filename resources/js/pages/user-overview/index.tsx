import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";

export default function index() {
    return (
        <AppLayout>
            <Card>

                <CardHeader>
                    <CardTitle>
                        card title
                    </CardTitle>
                    <CardDescription>
                        card description
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Table>
                        
                    </Table>
                </CardContent>

                <CardFooter>
                    <span>footer card</span>
                </CardFooter>

            </Card>
        </AppLayout>
    )
}