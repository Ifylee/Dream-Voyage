const typeDefs = `

type Category {
    id:ID
    name:String

}
    type Trip {

    id:ID
    title:String
    summary:String
    description:String
    img:String
    price: Int
    category: Category

}


type User {
    _id:ID
    firstName:String
    lastName:String
    email: String
    purchased:[Trip]
    wishList:[Trip]
}



type Auth {
    token:ID
    user:User

}


type Query {

    allUsers:[User]
    currentUser:User
    categories:[Category]
    allTrips:[Trip]
    oneTrip(id:ID):Trip

}

type Mutation {

    addUser(firstName:String!, lastName:String!, email:String!, password:String!):Auth

    login(email:String!, password:String!):Auth

    boughtTrip(id:ID):User

    addToList(id:ID!):User

    deleteFromList(id:ID!):User


}


`;

module.exports = typeDefs
