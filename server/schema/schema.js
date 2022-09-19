const {projects,clients} = require('../sampleData');

const {GraphQLObjectType,GraphQLID,GraphQLString, GraphQLSchema, GraphQLList} = require('graphql');

//Client Type

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields:()=>({
        id : {type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString}
    })
});

//Project Type

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields:()=>({
        id : {type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent,args){
                return clients.find(client => client.id === parent.clientId)
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return clients.find(client => client.id === args.id);
            }

        },
        clients:{
            type:GraphQLList(ClientType),
            resolve(parent,args){
                return clients;
            }

        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return projects.find(project => project.id === args.id);
            }

        },
        projects:{
            type:GraphQLList(ProjectType),
            resolve(parent,args){
                return projects;
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})