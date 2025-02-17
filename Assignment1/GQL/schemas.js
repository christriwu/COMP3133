const {gql} = require('apollo-server-express')

exports.typeDefs = gql `

    type Employee{
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        city: String!
        designation: String!
        department: String!
        salary: Float!
        date_of_joining : String!
        employee_photo : String!
        created : String!
        updated : String!

    }


    #query type - defines operations for retrieving data

    type Query {
        
        getEmployees : [Employee]


        getEmployeeByDesignation (
            designation: String!
        ) : [Employee]

        getEmployeeByID(id: ID!) : Employee

    }

    type Mutation {
        addEmployee(
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        city: String!
        designation: String!
        department: String!
        salary: Float!
        date_of_joining : String!
        employee_photo : String!
        created : String!
        updated : String!


        ) : Employee
        
        updateEmployeeById(
            id: ID!
            firstname: String!
            lastname: String!
            email: String!
            gender: String!
            city: String!
            designation: String!
            department: String!
            salary: Float!
            date_of_joining : String!
            employee_photo : String!
        ) : Employee

        deleteEmployee(id: ID!) : Employee
    }

        
`