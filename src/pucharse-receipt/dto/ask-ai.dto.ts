import { IsString, IsNotEmpty } from 'class-validator';

export class AskAIDto {
  @IsString()
  @IsNotEmpty()
  question: string;
}
