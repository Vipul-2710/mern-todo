use("vipuldatabase")

db.createCollection("todos")

// db.todos.insertOne({
//     title : "Do hoemwork",
//     description : "Twice a day",
//     importance : 90
// })

// db.todos.insertMany(
//     [
//         {
//             title: "Do homework",
//             description: "Twice a day",
//             importance: 90
//         },
//         {
//             title: "Go to Gym",
//             description: "5 times a week",
//             importance: 99
//         }
//     ]
// )

db.todos.updateOne(
    { importance: 90 }, { $set: { importance: 95 } }
)
db.todos.updateMany(
    {importance : 90}, { $set : {importance : 95}}
)

// Do DeleteOne and DeleteMany 
// db.todos.deleteOne({
//     importance: 90 
// })

// db.todos.deleteMany({
//     importance: 90 
// })

// findOne and find
const b = db.todos.findOne({importance : 99})
console.log(b._id)
