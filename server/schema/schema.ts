import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql'
import Product from '../models/product'

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
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({})
            },
        },
        product: {
            type: ProductType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Product.findById(args.id)
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                rating: { type: new GraphQLNonNull(GraphQLInt) },
                brand: { type: new GraphQLNonNull(GraphQLString) },
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
