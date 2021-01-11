// import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
// import { getVariables } from '../lib/variables';

// import { variables } from './variable';

// export const application = new GraphQLObjectType({
//   name: 'ApplicationType',
//   fields: {
//     id: {
//       type: GraphQLString,
//     },
//     name: {
//       type: GraphQLString,
//     },
//     variables: {
//       type: variables,
//       resolve: async (parent) => {
//         return await getVariables(parent.id);
//       },
//     },
//   },
// });

// export const applications = new GraphQLList(application);
