import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe, Ingredient, RecipeIngredient } from './entities/recipe.entity';
import { AuthService } from 'src/auth/auth.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe]),
    TypeOrmModule.forFeature([Ingredient]),
    TypeOrmModule.forFeature([RecipeIngredient]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService, AuthService],
})
export class RecipesModule {}
