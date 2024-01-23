import * as z from 'zod';
import {checkUserUnique, checkTicketUnique, checkDeptUnique, checkTicketCategoryUnique} from '@/app/lib/functions';

const userType = z.enum(['User', 'Employee', 'Adminstrator']);
const statusTypes = z.enum(['Pending', 'Open', 'In_Progress', 'Closed']);
const priorityTypes = z.enum(['Critical', 'Moderate', 'Medium', 'Low']);



export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(64, 'First name must be less than 64 characters'),
  lastName: z.string().min(1, 'Last name is required').max(64, 'Last name must be less than 64 characters'),
  email: z.string().email('Invalid email format').max(64, 'Email must be less than 64 characters').refine(async(value)=>{return checkUserUnique("email", value)}, {message: "Email must be unique."}),
  username: z.string().min(1, 'Username is required').max(255, 'Username must be less than 255 characters').refine(async(value)=>checkUserUnique("username", value), {message: "Username must be unique."}),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNo: z.string().regex(/^\d{11}$/, 'Phone number must be 11 digits'),
  userType: userType,
});

// Ticket schema
export const ticketSchema = z.object({
  categoryId: z.number().int().positive(),
  title: z.string().min(1, 'Title is required').max(64, 'Title must be less than 64 characters').refine(async(value)=>checkTicketUnique("title", value), {message: "Title must be unique."}),
  description: z.string().min(1, 'Description is required'),
  submittedDate: z.date().optional(),
  startDate: z.date().optional(),
  lastUpdatedDate: z.date().optional(),
  endDate: z.date().optional(),
  issuerId: z.number().int().positive(),
  assigneeId: z.number().int().optional(),
  departmentId: z.number().int().positive(),
  status: statusTypes.optional(),
  priority: priorityTypes.optional(),
});

// Department schema
export const deptSchema = z.object({
  departmentName: z.string().min(1, 'Name is required').max(64, 'Name must be less than 64 characters').refine(async(value)=>checkDeptUnique(value), {message: "Department name must be unique."})
});

// TicketCategory schema
export const ticketCategorySchema = z.object({
  categoryName: z.string().min(1, 'Name is required').max(64, 'Name must be less than 64 characters').refine(async(value)=>checkTicketCategoryUnique(value), {message: "Ticket category name must be unique."})
});
