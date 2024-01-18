import p from '@/app/lib/prisma';
import cron from "node-cron";
import crypto from "crypto";

const prisma = p;

const userIncludes = {
                    submittedTickets: true,
                    assignedTickets: true,
                }

const includes = {
    tickets: true,
}

const findObj = (fieldName, value, i) => ({
                where: {
                    [fieldName]: {
                        contains: value
                    },
                },
                include: i,
            });

const findObjForEnums = (fieldName, value) => ({
                where: {
                    [fieldName]: value
                },
            });

export async function checkUserUnique(fieldName, value) {
    // console.log(await findSingleRecord(fieldName, value, 'user') === null )
    return await findSingleRecord(fieldName, value, 'user') === null;
}

export async function checkDeptUnique(dept) {
  return await findSingleRecord('departmentName', dept, 'department') === null; 
}

export async function checkTicketCategoryUnique(cate) {
  return await findSingleRecord('categoryName', cate, 'ticketCategory') === null; 
}

export async function checkTicketUnique(fieldName, value) {
    return await findSingleRecord(fieldName, value, 'ticket') === null; 
}

export const findSingleRecord = async (fieldName, value, tableName) => {
    let record = null;
    
    switch (tableName) {
        case 'user':
            const user = await prisma.user.findUnique({
                where: {
                    [fieldName]: value,
                }, 
                include: userIncludes,
            });
            if (user) {
                const { userToken, ...userWithoutToken } = user;
                record = userWithoutToken;
            }
            break;
        case 'department':
            record = await prisma.department.findUnique({
                where: {
                    [fieldName]: value,
                }, include: includes
            });
            break;
        case 'ticketCategory':
            record = await prisma.ticketCategory.findUnique({
                where: {
                    [fieldName]: value,
                }, include: includes
            });
            break;
        case 'ticket':
            record = await prisma.ticket.findUnique({
                where: {
                    [fieldName]: value,
                },
            });
            break;
        default:
            throw new Error(`Invalid table name: ${tableName}`);
    }
    
    return record;
}

export const findMultiRecords = async (fieldName, value, tableName) => {
    let records = null;
    
    switch (tableName) {
        case 'user':
            let users = [];
            fieldName === "userType" || fieldName==="emailVerified" ? 
            users = await prisma.user.findMany(findObjForEnums(fieldName, value, userIncludes)) :
            users = await prisma.user.findMany(findObj(fieldName, value));
            records = users.map(({ userToken, ...userWithoutToken }) => userWithoutToken);
            break;
        case 'ticket':
            fieldName === "priority" || fieldName === "status" ? 
            records = await prisma.ticket.findMany(findObjForEnums(fieldName, value, null)) :
            records = await prisma.ticket.findMany(findObj(fieldName, value, null));
            break;
        case 'department':
            records = await prisma.department.findMany({
                where: {
                    [fieldName]: {
                        contains: value
                    },
                },
            });
            break;
        case 'ticketCategory':
            records = await prisma.ticketCategory.findMany({
                where: {
                    [fieldName]: {
                        contains: value
                    },
                },
            });
            break;
        default:
            throw new Error(`Invalid table name: ${tableName}`);
    }
    
    return records;
}

export const findAllRecords = async (tableName) => {
    let records = null;
    
    switch (tableName) {
        case 'user':
            const users = await prisma.user.findMany({include: userIncludes});
            users ? records = users.map(({ userToken, ...userWithoutToken }) => userWithoutToken) : records = users;
            break;
        case 'department':
            records = await prisma.department.findMany({include: includes});
            break;
        case 'ticketCategory':
            records = await prisma.ticketCategory.findMany({include: includes});
            break;
        case 'ticket':
            records = await prisma.ticket.findMany();
            break;
        default:
            throw new Error(`Invalid table name: ${tableName}`);
    }

    if (records) {
        var record_count = records.length;
        // console.log(!records[0].submittedTickets)
        records = {count: record_count, records}
    }
    return records;
}

export const sortTicketsByStatus = (records, status_name, priority_name) => {
    if (status_name === "none") return sortTicketsByPriority(records, priority_name);
    else{
        status_name === "all" ? status_name = ["pending", "inProgress", "open", "closed"] : status_name = status_name.split("&");
    }
    
    let sorted_tickets = null;
    const record_count = records.length;
    var pending_list = []
    var inProgress_list = []
    var open_list = []
    var closed_list = []
    
    // console.log("Org Record: "+records[0])
    records.map((ticket) => {
                if(status_name.includes("pending")) ticket.status === "Pending" && pending_list.push(ticket)
                if(status_name.includes("inProgress")) ticket.status === "In_Progress" && inProgress_list.push(ticket)
                if( status_name.includes("open")) ticket.status === "Open" && open_list.push(ticket)
                if( status_name.includes("closed")) ticket.status === "Closed" && closed_list.push(ticket) 
            })
    sorted_tickets = {...(status_name.includes("pending") ||status_name.includes("inProgress") ||status_name.includes("open") ||status_name.includes("closed")  ? {total_tickets: pending_list.length+inProgress_list.length+open_list.length+closed_list.length} : {}),
                            ...(status_name.includes("pending") ? {pendingTickets: {count: pending_list.length, tickets: sortTicketsByPriority(pending_list, priority_name)}} : {}),
                            ...(status_name.includes("inProgress") ? {inProgressTickets: {count: inProgress_list.length, tickets: sortTicketsByPriority(inProgress_list, priority_name)}} : {}),
                            ...(status_name.includes("open") ? {openTickets: {count: open_list.length, tickets: sortTicketsByPriority(open_list, priority_name)}} : {}),
                            ...(status_name.includes("closed") ? {closedTickets: {count: closed_list.length, tickets: sortTicketsByPriority(closed_list, priority_name)}} : {}),
                            }

    // sorted_tickets = sortTicketsByPriority(pending_list, priority_name)
    // sorted_tickets = by_status_sorted_tickets
    return sorted_tickets;

}

const sortTicketsByPriority = (records, priority_name) => {
    var by_priority_list = { criticalList: [], moderateList:[], mediumList:[], lowList:[]}
    if (priority_name === "none") return records;   
    else{
        priority_name === "all" ? priority_name = ["critical", "moderate", "medium", "low"] : priority_name = priority_name.split("&");
    }     
        records.map((ticket) => {
                if(priority_name==="all" || priority_name.includes("critical")) ticket.priority === "Critical" && by_priority_list.criticalList.push(ticket)
                if(priority_name==="all" ||priority_name.includes("moderate")) ticket.priority === "Moderate" && by_priority_list.moderateList.push(ticket)
                if(priority_name==="all" || priority_name.includes("medium")) ticket.priority === " Medium" && by_priority_list.mediumList.push(ticket)
                if(priority_name==="all" || priority_name.includes("low")) ticket.priority == "Low" && by_priority_list.lowList.push(ticket)
    }) 
// console.log(by_priority_list)
    const sorted_tickets =  {...(priority_name.includes("critical") ||priority_name.includes("moderate") ||priority_name.includes("medium") ||priority_name.includes("low")  ? {total_tickets: by_priority_list.criticalList.length+by_priority_list.moderateList.length+by_priority_list.mediumList.length+by_priority_list.lowList.length} : {}),
                            ...(priority_name.includes("critical") || priority_name === "all" ? {ticketsInCritical: {count: by_priority_list.criticalList.length, tickets: by_priority_list.criticalList}} : {}),
                            ...(priority_name.includes("moderate") || priority_name === "all" ? {ticketsInModerate: {count: by_priority_list.moderateList.length, tickets: by_priority_list.moderateList}} : {}),
                            ...(priority_name.includes("medium") || priority_name === "all" ? {ticketsInMedium: {count: by_priority_list.mediumList.length, tickets: by_priority_list.mediumList}} : {}),
                            ...(priority_name.includes("low")  || priority_name === "all" ? {ticketsInLow: {count: by_priority_list.lowList.length, tickets: by_priority_list.lowList}} : {}),
                            }
return sorted_tickets;
}


export const updateRecordById = async ({id, data, tableName}) => {
    let record = null;
    
    switch (tableName) {
        case 'user':
            const user = await prisma.user.update({
                where: {
                    id: Number(id),
                },
                include: userIncludes,
                data,
            });
            const { userToken, ...userWithoutToken } = user || {};
            record = user ? userWithoutToken : user;
            // console.log(record);
            break;
        case 'department':
            record = await prisma.department.update({
                where: {
                    id: Number(id),
                },
                include: includes,
                data,
            });
            break;
        case 'ticketCategory':
            record = await prisma.ticketCategory.update({
                where: {
                    id: Number(id),
                },
                include: includes,
                data,
            });
            break;
        case 'ticket':
            record = await prisma.ticket.update({
                where: {
                    id: Number(id),
                },
                data,
            });
            break;
        default:
            throw new Error(`Invalid table name: ${tableName}`);
    }
    
    return record;
}

export async function userTokenValidation(request) {
  const authHeader = await request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = await authHeader.split(' ')[1];
//   console.log(token)

  const user = await prisma.user.findUnique({
    where: {
      userToken: token
    }
  });

  if (!user) {
    return false;
  }

  return true;
}

export async function scheduleTokenUpdates(userId) {
    await updateUserToken(userId);
    cron.schedule('0 0 * * *', () => {
    updateUserToken(userId);
  });
//   cron.schedule('* * * * *', () => {
//     updateUserToken(userId);
//   });
//   console.log('Token update scheduled');
}

export async function updateUserToken(userId) {
  const newToken = crypto.randomBytes(10).toString('hex');
  try {
    await prisma.user.update({
    where: { id: userId },
    data: { userToken: newToken },
  });
  } catch (error) {
    if (error.code === 'P2002') {
    //   console.log('Unique constraint violation: ', error.meta.target);
      updateUserToken(userId);
    }
  }
}


export async function createUser(data) {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    // console.log(error);
      throw new Error(error);

  }

}

