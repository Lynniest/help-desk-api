
"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { submitResetPsw } from "@/app/lib/actions"
import {useFormStatus, useFormState} from "react-dom";
import { redirect } from "next/navigation";

export default function ForgotPswPage(request) {
    const resetPsw = submitResetPsw.bind(null, request.params.token)
    const [error, formAction] = useFormState(resetPsw, null);
    error && error.success && redirect("/reset_password/status/success")
    return (
        <div className="w-full flex justify-center items-end h-full p-10">
            <form action={formAction} className="w-full max-w-md">
                <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Reset your account password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" placeholder="Enter new password" type="password" name="newPassword" required/>
                    {error && error.newPasswordField && <div className="text-red-500">{error.newPasswordField}</div>}
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                    <Input name="confirmNewPassword" id="confirm-new-password" placeholder="Confirm new password" type="password" required/>
                    {error && error.confirmNewPasswordField && <div className="text-red-500">{error.confirmNewPasswordField}</div>}
                    </div>
                    {error && error.common && <div className="text-red-500">{error.common}</div>}
                </CardContent>
                <CardFooter>
                    <Button className="ml-auto" type="submit">Reset Password</Button>
                </CardFooter>
                </Card>
            </form>
        </div>
    )
}

