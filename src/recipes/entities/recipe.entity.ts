
import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;
    
    @Column()
    description: string;

    @Column()
    body: string;

    @Column({
        nullable:true
    })
    sourceUrl: string;

    @Column()
    creationDate: Date;
}

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    name: string;
}

@Entity()
@Unique(['recipeId', 'ingredientId'])
export class RecipeIngredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    recipeId: number;

    @Column()
    ingredientId: number;
}