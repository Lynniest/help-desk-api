"use server";
import React from 'react';
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios';



const Ticket = async() => {
  const emp_response =  await axios.get(`${process.env.API_URL}/users/find/userType/Employee`);
  const employee_list =  await emp_response.data.filter((employee) => employee.emailVerified );
  // console.log(employee_list[0].username);

  return (
    <>

      <div className='flex flex-col flex-between text-black'>
        <select name="cars" id="cars">
          {employee_list.map((employee) => (<option key={employee.id} value={employee.id}>{employee.username}</option>))}
        </select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Assign An Employee " />
            </SelectTrigger>
            <SelectContent>
              {employee_list.map((employee) =>{
                return (                <SelectItem key={employee._id} value={employee._id}>
                  {employee.username}
                </SelectItem>)
              } )}
            </SelectContent>
          </Select>

      </div>
      <Separator />

    </>

  )
}

export default Ticket;
