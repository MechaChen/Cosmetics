import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
} from 'graphql'
import Product from '../models/product'

// dummy data
const products = [
    {
        id: '1',
        name: '極緻活顏煥肌活顏素',
        type: '精華液',
        rating: 5,
        brand: 'The Body Shop',
    },
    {
        id: '2',
        name: '特潤超導全方位修護露',
        type: '精華液',
        rating: 5,
        brand: 'Estee Lauder',
    },
]

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        rating: { type: GraphQLInt },
        brand: { type: GraphQLString },
    },
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        product: {
            type: ProductType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return products.find((product) => product.id === args.id)
            },
        },
    },
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLString },
                type: { type: GraphQLString },
                rating: { type: GraphQLInt },
                brand: { type: GraphQLString },
            },
            resolve(parent, args) {
                const product = new Product({ ...args })
                return product.save()
            },
        },
    },
})

export default new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})
