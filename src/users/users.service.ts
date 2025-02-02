import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    async create(createUserDto: CreateUserDto) {
        // Verificar si el email ya existe
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword
        });
        return await newUser.save();
    }

    async findAll() {
        return await this.userModel.find().select('-password').exec();
    }

    async findOne(id: string) {
        const user = await this.userModel.findById(id).select('-password').exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async updateStatus(id: string, updateUserDto: UpdateUserDto) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(
                id,
                { isActive: updateUserDto.isActive },
                { new: true }
            )
            .select('-password')
            .exec();

        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }

        return updatedUser;
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }
} 