import { InputType, Field } from 'type-graphql';

import { ObjectId } from 'mongodb';
import { Stream } from '../entity/Stream';

@InputType()
export class CarInputs implements Partial<Stream> {
    @Field({ nullable: true })
    id?: ObjectId;

    @Field()
    make: string;

    @Field()
    model: string;

    @Field()
    estimadeDate: string;

    @Field({ nullable: true })
    description?: string;

    @Field()
    image: string;
}