const typeDefs = `

type User {
    _id:ID
    firstName:String
    lastName:String
    email: String
}

type Trip {

    id:ID
    

}

type Auth {
    token:ID
    user:User

}


type Query {

    allUsers:[User]

}

type Mutation {

    addUser(firstName:String!, lastName:String!, email:String!, password:String!):Auth

    login(email:String!, password:String!):Auth


}


`;

module.exports = typeDefs
