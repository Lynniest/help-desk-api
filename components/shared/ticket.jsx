"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
const Ticket = () => {
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const empResponse = await axios.get(`${process.env.API_URL}/users/find/userType/Employee`);
        const employeeList =await empResponse.data.filter((employee) => employee.emailVerified);
        setEmployeeList(employeeList);
        console.log(employeeList)
        
      } catch (error) {
        console.log(error)
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
      <div className='flex flex-col flex-between text-black'>
        {/* <select name="cars" id="cars">
          {employeeList.map((employee) => (<option key={employee.id} value={employee.id}>{employee.username}</option>))}
        </select> */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Assign An Employee" />
          </SelectTrigger>
          <SelectContent>
               {employeeList.map((employee) => (<SelectItem key={employee.id} value={employee.id}>{employee.username}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Ticket;