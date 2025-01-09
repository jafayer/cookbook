import { Controller, Get, Post, Render, Redirect, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Repository } from 'typeorm';
import { Recipe } from './recipes/entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'node:path';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  @Get()
  @Render('index')
  async getHello(){
    const recipes = await this.recipeRepository.find();
    return { recipes };
  }

  @UseGuards(JwtAuthGuard)
  @Get('add')
  @Render('add')
  getAdd(){
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Post('add')
  @Render('add')
  async postAdd(body: Recipe){
    const result = await this.recipeRepository.save(body);
    const path = join('/recipe', result.id.toString());
    Redirect(path);
  }

  @Get('login')
  @Render('login')
  getLogin(@Req() req) {
    return {};
  }


}
