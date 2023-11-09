import { AuthEffects } from "../auth/auth.effects";
import { FileEffects } from "../file/file.effects";
import { UserEffects } from "../user/user.effects";

export const coreEffects = [
  AuthEffects,
  UserEffects,
  FileEffects
];
