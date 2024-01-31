/**
 * v0 by Vercel.
 * @see https://v0.dev/t/urGgzr8MzyI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-custom-bg-light mx-auto space-y-6 px-20 py-10 mt-10 w-[500px] rounded-2xl text-custom-header">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-custom-header">Registration</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" name="firstName" required placeholder="first name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" name="lastName" required  placeholder="last name" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="username"  name="username" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" name="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" required type="password" name="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone-number">Phone Number</Label>
          <Input id="phone-number" name="phoneNo" placeholder="09 . . . . . . . ." required />
        </div>
        <Button className="w-full" type="submit">
          Register
        </Button>
        <p className="text-center">Already have an acount? <Link href="/login" className='ml-1 text-blue-500 hover:text-blue-700 underline'>Login</Link></p>
      </div>
    </div>
  )
}

