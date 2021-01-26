import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'
import { User } from './User'
import { Ref } from "../types/Ref";

@ObjectType({ description: 'Car embedded prost content' })
export class Car {
    @Field()
    readonly _id: ObjectId;

    @Field()
    @Property({ required: true })
    make: string;

    @Field()
    @Property({ required: true })
    description: string;

    @Field()
    @Property({ required: true })
    model: string;

    @Field()
    @Property({ required: true })
    estimadeDate: string;

    @Field()
    @Property({ required: true })
    image: string;

    @Field(() => User)
    @Property({ ref: User, required: true })
    author: Ref<User>;
}

export const CarModel = getModelForClass(Car);
