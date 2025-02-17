const Employee = require('../models/Employee')


exports.resolvers = {
    Query: {
        getEmployees: async(parent,args) => {
            console.log(`Fetching all employees`);

            return await Employee.find({})
        },
        getEmployeeByDesignation: async(parent,args) => {
            console.log(`fetching all employees by designation/department: ${args.designation}`);

            const emps = await Employee.find({designation: new RegExp(args.designation, 'i')})
            console.log(`matching employees : ${JSON.stringify(emps)}`);
            
            return emps
        },
        getEmployeeByID: async (parent, {id}) => {
            console.log(`fetching employee by ${id}`)

            const emps = await Employee.findById( id)
            console.log(`matching employees: ${JSON.stringify(emps)}`)

            return emps
        }
    },
    Mutation: {
        addEmployee: async (parent, args) => {
            console.log(`Trying to insert employee with email ${args.email}`)


            let newEmployee = new Employee({
                firstname: args.firstname,
                lastname: args.lastname,
                gender : args.gender,
                city : args.city,
                designation : args.designation,
                salary : args.salary,
                employee_photo : args.employee_photo,
                email : args.email,
                department : args.department
            })

            return await newEmployee.save()
        },
        updateEmployeeById: async (parent, args) => {
            if(!args.id){
                console.log(`ID not provided`);
                return JSON.stringify({
                    status: false,
                    "message": "Please provide employee ID to update"
                })
            }

            console.log(`Tryint to updat employee  id ${args.id}`);

            return await Employee.findOneAndUpdate(
                {_id: args.id},
                {
                    $set: {
                        firstname: args.firstname,
                        lastname: args.lastname,
                        gender : args.gender,
                        city : args.city,
                        designation : args.designation,
                        salary : args.salary,
                        employee_photo : args.employee_photo,
                        email : args.email,
                        department : args.department

                    }
                },
                {new: false},
                (err,employee) => {
                    if(err){
                        console.log(`COuld not update employee: ${JSON.stringify(err)}`);
                        return null;
                    }else{
                        console.log(`Employee infor updated : ${JSON.stringify(employee)}`)
                        return employee
                    }
                }

            )
        },
        deleteEmployee : async(parent, args) => {
            if(!args.id){
                console.log(`ID not provided`)
                return JSON.stringify({
                    status: false,
                    "message" : "Provide employee ID"
                })
            }

            console.log(`Deleting employee ${args.id}`)

            return await Employee.findByIdAndDelete(args.id)
        }
    }
}