import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe, Ingredient, RecipeIngredient  } from './entities/recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(RecipeIngredient)
    private recipeIngredientRepository: Repository<RecipeIngredient>,


  ) {}

  create(createRecipeDto: CreateRecipeDto) {
    const createDate = new Date();
    return this.recipeRepository.save({...createRecipeDto, creationDate: createDate});
  }

  findAll() {
    return this.recipeRepository.find();
  }

  findOne(id: number) {
    return this.recipeRepository.findOneBy({ id });
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.recipeRepository.update(id, updateRecipeDto);
  }

  remove(id: number) {
    return this.recipeRepository.delete(id);
  }

  search(query: string) {
    return;
  }
}

async function ignoreUniques<T>(fn: () => Promise<T>): Promise<T | undefined> {
  try {
    return await fn();
  } catch (e) {
    if (e.code !== 'SQLITE_CONSTRAINT' && !e.message.includes('UNIQUE constraint failed')) {
      throw e;
    }
    return undefined;
  }
}