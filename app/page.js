"use client";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
// import { addNewUser } from "./lib/actions"

export default function Component() {
  return (
    <form action="">
          <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-gray-500 dark:text-gray-400">Fill in the form to create your account</p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name" >First name</Label>
            <Input id="first-name" placeholder="John" required name="firstName"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" name="lastName" placeholder="Doe" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="johndoe" required name="username"/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="john@example.com" required type="email" name="email"/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" required type="password" name="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone-number">Phone Number</Label>
          <Input id="phone-number" placeholder="123-456-7890" name="phoneNo"required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="user-type">User Type</Label>
          <Select name="userType">
            <SelectTrigger id="user-type" >
              <SelectValue placeholder="Select User Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Adminstrator">Adminstrator</SelectItem>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Employee">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" type="submit">
          Register
        </Button>
      </div>
    </div>
    </form>

  )
}


