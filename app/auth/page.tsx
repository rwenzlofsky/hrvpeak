import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export default function AuthRoute() {

    return (

        <Card>
            <CardHeader>
                <CardTitle>Please sign in</CardTitle>
                <CardDescription>You need to be authenticated to access this website</CardDescription>
            </CardHeader>
        </Card>
    )


}