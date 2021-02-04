export class CreateTaskDto {
  readonly projectID: string;
  readonly name: string;
  readonly description: string;
  readonly created?: Date;
}
