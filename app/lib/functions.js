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
            fieldName === "userType" ? 
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
    
    return records;
}

export const updateRecordById = async ({id, data, tableName}) => {
    let record = null;
    
    switch (tableName) {
        case 'user':
            record = await prisma.user.update({
                where: {
                    id: Number(id),
                },
                data,
            });
            break;
        case 'department':
            record = await prisma.department.update({
                where: {
                    id: Number(id),
                },
                data,
            });
            break;
        case 'ticketCategory':
            record = await prisma.ticketCategory.update({
                where: {
                    id: Number(id),
                },
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
  console.log('Token update scheduled');
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
      console.log('Unique constraint violation: ', error.meta.target);
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

