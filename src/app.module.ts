import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RecipesModule } from './recipes/recipes.module';
import { DataSource } from 'typeorm';
import { Ingredient, Recipe, RecipeIngredient } from './recipes/entities/recipe.entity';
import { CookModule } from './cook/cook.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

const dbType = process.env.DEPLOY_ENV === 'production' ? 'postgres' : 'better-sqlite3';

const dbArgs = {
  type: dbType,
  database: 'database.sqlite',
  entities: [ Recipe, Ingredient, RecipeIngredient ],
  synchronize: true,
  ...(dbType === 'better-sqlite3' && {
    database: 'database.sqlite',
  }),
  ...(dbType === 'postgres' && {
    host: process.env.DATABASE_URL,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: undefined,
    synchronize: true,
  }),
} as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRoot(dbArgs),
    RecipesModule,
    CookModule,
    TypeOrmModule.forFeature([Recipe]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
