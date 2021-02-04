export class CreateUserDto {
  readonly email: string;
  readonly name: { firstName: string; secondName: string };
  readonly password: string;
}
