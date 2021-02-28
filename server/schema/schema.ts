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
import Brand from '../models/brand'

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        rating: { type: GraphQLInt },
        brand: {
            type: BrandType,
            resolve(parent, args) {
                return Brand.findById(parent.brandId)
            },
        },
    }),
})

const BrandType = new GraphQLObjectType({
    name: 'Brand',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        country: { type: GraphQLString },
        founders: { type: new GraphQLList(GraphQLString) },
        products: {
            type: ProductType,
            resolve(parent, args) {
                return Product.find({ brandId: parent.id })
            },
        },
    }),
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
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent, args) {
                return Brand.find({})
            },
        },
        brand: {
            type: BrandType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Brand.findById(args.id)
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
                brandId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const product = new Product({ ...args })
                return product.save()
            },
        },
        addBrand: {
            type: BrandType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                country: { type: new GraphQLNonNull(GraphQLString) },
                founders: {
                    type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
                },
            },
            resolve(parent, args) {
                const product = new Brand({ ...args })
                return product.save()
            },
        },
    },
})

export default new GraphQLSchema({
    query: Query,
    mutation: Mutation,
})
