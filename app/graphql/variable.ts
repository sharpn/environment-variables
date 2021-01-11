// import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

// import { getLatestVariableValue } from '../lib/variables';

// export const variable = new GraphQLObjectType({
//   name: 'VariableType',
//   fields: {
//     id: {
//       type: GraphQLString,
//     },
//     key: {
//       type: GraphQLString,
//     },
//     value: {
//       type: GraphQLString,
//       resolve: async (parent) => {
//         const latestValue = await getLatestVariableValue(parent.id);
//         return latestValue ? latestValue.value : null;
//       },
//     },
//   },
// });

// export const variables = new GraphQLList(variable);
