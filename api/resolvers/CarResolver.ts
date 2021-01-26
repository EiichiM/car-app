import {
    Resolver,
    Query,
    Mutation,
    FieldResolver,
    Ctx,
    Arg,
    Root,
    UseMiddleware,
} from 'type-graphql';
import { ObjectId } from 'mongodb';
import { MyContext } from '../types/MyContext';
import { User, UserModel } from '../entity/User';
import { Car, CarModel } from '../entity/Car';
import { ObjectIdScalar } from '../schema/object-id.scalar';
import { CarInputs } from '../types/CarInput';
import { isAuth } from '../middleware/isAuth';

@Resolver(() => Car)
export class CarResolver {
    @Query(() => Car, { nullable: true })
    car(@Arg('carId', () => ObjectIdScalar) carId: ObjectId) {
        // 1. find a single car
        return CarModel.findById(carId);
    }

    @Query(() => [Car])
    @UseMiddleware(isAuth)
    MyCars(@Ctx() ctx: MyContext) {
        // 2. display all car for the current user
        return CarModel.find({ author: ctx.res.locals.userId });
    }

    @Mutation(() => Car)
    @UseMiddleware(isAuth)
    async addCar(
        @Arg('input') carInput: CarInputs,
        @Ctx() ctx: MyContext
    ): Promise<Car> {
        // 3. create a new user's car
        const car = new CarModel({
            ...carInput,
            author: ctx.res.locals.userId,
        } as Car);

        await car.save();

        return car;
    }

    @Mutation(() => Car)
    @UseMiddleware(isAuth)
    async editCar(
        @Arg('input') carInput: CarInputs,
        @Ctx() ctx: MyContext
    ): Promise<Car> {
        const { id, make, model, description, image, estimadeDate } = carInput;
        const car = await CarModel.findOneAndUpdate(
            { _id: id, author: ctx.res.locals.userId },
            {
                make,
                model,
                description,
                image,
                estimadeDate
            },
            { runValidators: true, new: true }
        );
        if (!car) {
            throw new Error('Car not found');
        }
        return car;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteCar(
        @Arg('carId', () => ObjectIdScalar) carId: ObjectId,
        @Ctx() ctx: MyContext
    ): Promise<Boolean | undefined> {
        const deleted = await CarModel.findOneAndDelete({
            _id: carId,
            author: ctx.res.locals.userId,
        });
        if (!deleted) {
            throw new Error('Car not found');
        }
        return true;
    }

    @FieldResolver()
    async author(@Root() car: Car): Promise<User | null> {
        return await UserModel.findById(car.author);
    }
}