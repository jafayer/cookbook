import { ApiProperty } from "@nestjs/swagger";

export class CreateRecipeDto {
    @ApiProperty({
        description: 'The title of the recipe',
        title: 'Recipe title',
        example: 'Berry Banana Smoothie',
    })
    title: string;

    @ApiProperty({
        description: 'The description of the recipe',
        title: 'Recipe description',
        example: 'A delicious and healthy smoothie made with berries and bananas',
    })
    description: string;

    @ApiProperty({
        description: 'The body of the recipe',
        title: 'Recipe body',
        example:`
>> source: https://www.dinneratthezoo.com/wprm_print/6796
>> total time: 6 minutes
>> servings: 2

Place the @apple juice{1,5%cups}, @banana{one sliced}, @frozen mixed berries{1,5%cups} and @vanilla greek yogurt{3/4%cup} in a #blender{}; blend until smooth. If the smoothie seems too thick, add a little more liquid (1/4 cup). 

Taste and add @honey{} if desired. Pour into two glasses and garnish with fresh berries and mint sprigs if desired.
`,
    })
    body: string;

    @ApiProperty({
        description: 'The source URL of the recipe',
        title: 'Recipe source URL',
        example: 'https://www.dinneratthezoo.com/berry-banana-smoothie/',
    })
    sourceUrl: string;
}
