import { PartialType } from '@nestjs/mapped-types';
import { CreateCargasDto } from './create-cargas.dto';

export class UpdateCargasDto extends PartialType(CreateCargasDto) {}
