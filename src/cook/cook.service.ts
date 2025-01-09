import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recipe } from '../recipes/entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe as CRecipe, Parser, getImageURL } from '@cooklang/cooklang-ts';

@Injectable()
export class CookService {
    constructor(
        @InjectRepository(Recipe)
        private readonly recipeRepository: Repository<Recipe>
    ) {}

    async getJson(id: number): Promise<CRecipe> {
        const recipe = await this.recipeRepository.findOneBy({id});
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        return new CRecipe(recipe.body);
    }
    
    async render(id: number) {
        const recipe = await this.recipeRepository.findOneBy({id});
        if(!recipe) {
            throw new NotFoundException('Recipe not found');
        }
        const crecipe = new CRecipe(recipe.body);
        return {...crecipe, id: recipe.id, title: recipe.title, description: recipe.description, sourceUrl: recipe.sourceUrl, creationDate: recipe.creationDate};
    }

    async fromText(text: string): Promise<CRecipe> {
        return new CRecipe(text);
    }
}
