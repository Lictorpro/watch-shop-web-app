import BandTypeModel from "./BandTypeModel.model";
import * as mysql2 from "mysql2/promise";
import IAdapterOptions from "../../common/IAdapterOptions.interface";
import BaseService from "../../common/BaseService";
import IAddBandType from './dto/IAddBandType.dto.';
import IEditBandType from './dto/IEditBandType.dto';

interface IBandTypeAdapterOptions extends IAdapterOptions {
  loadItems: boolean;
}

const DefaultBandTypeAdapterOptions: IBandTypeAdapterOptions = {
  loadItems: false,
};

class BandTypeService extends BaseService<
  BandTypeModel,
  IBandTypeAdapterOptions
> {
  tableName(): string {
    return "band_type";
  }

  protected async adaptToModel(
    data: any,
    options: IBandTypeAdapterOptions = DefaultBandTypeAdapterOptions
  ): Promise<BandTypeModel> {
    const bandType: BandTypeModel = new BandTypeModel();

    bandType.bandTypeId = +data?.band_type_id;
    bandType.name = data?.name;

    return bandType;
  }

  public async getAll(): Promise<BandTypeModel[]> {
    return new Promise<BandTypeModel[]>((resolve, reject) => {
      const sql: string = "SELECT * FROM `band_type` ORDER BY `name`;";
      this.db
        .execute(sql)
        .then(async ([rows]) => {
          if (rows === undefined) {
            resolve([]);
          }

          const bandTypes: BandTypeModel[] = [];

          for (const row of rows as mysql2.RowDataPacket[]) {
            bandTypes.push(
              await this.adaptToModel(row, {
                loadItems: true,
              })
            );
          }

          resolve(bandTypes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async add(data: IAddBandType): Promise<BandTypeModel> {
    return this.baseAdd(data, DefaultBandTypeAdapterOptions);
  }

  public async editById(
    bandTypeId: number,
    data: IEditBandType,
    options: IBandTypeAdapterOptions = DefaultBandTypeAdapterOptions
  ): Promise<BandTypeModel> {
    return this.baseEditById(bandTypeId, data, options);
  }


}

export default BandTypeService;
export { DefaultBandTypeAdapterOptions };
