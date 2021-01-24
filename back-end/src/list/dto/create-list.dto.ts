import { ApiProperty } from '@nestjs/swagger';
import { CreateTaskWithinListDto } from '../../task/dto/create-task.dto';

export class CreateListDto {
  @ApiProperty({ name: 'title', required: true })
  title: string;

  @ApiProperty({ name: 'description', required: false })
  description?: string;

  @ApiProperty({
    name: 'tasks',
    required: false,
    type: [CreateTaskWithinListDto],
  })
  tasks?: CreateTaskWithinListDto[];
}
