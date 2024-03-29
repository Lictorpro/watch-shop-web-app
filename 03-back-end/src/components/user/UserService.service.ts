import BaseService from "../../common/BaseService";
import UserModel from "./UserModel.model";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import { IRegisterUserDto, IAddUser } from './dto/IRegisterUser.dto';
import IEditUser from "./dto/IEditUser.dto";

export class UserAdapterOptions implements IAdapterOptions {
  removePassword: boolean;
  removeActivationCode: boolean;
}

export const DefaultUserAdapterOptions: UserAdapterOptions = {
  removePassword: false,
  removeActivationCode: false
};

export default class UserService extends BaseService<
  UserModel,
  UserAdapterOptions
> {
  tableName(): string {
    return "user";
  }

  sortField(): string {
    return "user_id";
  }

  protected async adaptToModel(
    data: any,
    options: UserAdapterOptions = DefaultUserAdapterOptions
  ): Promise<UserModel> {
    const user: UserModel = new UserModel();

    user.userId = +data?.user_id;
    user.email = data?.email;
    user.passwordHash = data?.password_hash;
    user.createdAt = data?.created_at;
    user.forename = data?.forename;
    user.surname = data?.surname;
    user.activationCode = data?.activation_code ? data?.activation_code : null;
    user.address = data?.address;
    user.isActive = +data?.is_active === 1;

    if (options.removePassword) {
      user.passwordHash = null;
    }

    if (options.removeActivationCode) {
      user.activationCode = null;
    }

    return user;
  }

  public async add(data: IAddUser): Promise<UserModel> {
    return this.baseAdd(data, {
      removeActivationCode: false,
      removePassword: true
    });
  }

  public async edit(id: number, data: IEditUser): Promise<UserModel> {
    return this.baseEditById(id, data, {
      removePassword: true,
      removeActivationCode: true
    })
  }

  public async getUserByActivationCode(code: string, option: UserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel | null> {
    return new Promise((resolve, reject) => {
      this.getAllByFieldNameAndValue("activation_code", code, option)
        .then(result => {
          if (result.length === 0) {
            return resolve(null);
          }

          resolve(result[0]);
        })
        .catch(error => {
          reject(error?.message);
        })
    })

  }

  public async getByEmail(email: string, option: UserAdapterOptions = DefaultUserAdapterOptions): Promise<UserModel | null> {
    return new Promise((resolve, reject) => {
      this.getAllByFieldNameAndValue("email", email, option)
        .then(result => {
          if (result.length === 0) {
            return resolve(null);
          }

          resolve(result[0]);
        })
        .catch(error => {
          reject(error?.message);
        })
    })

  }
}