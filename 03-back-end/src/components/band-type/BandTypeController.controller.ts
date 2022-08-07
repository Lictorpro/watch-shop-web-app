import BaseController from '../../common/BaseController';
import { Request, Response } from 'express';
import { DefaultBandTypeAdapterOptions } from './BandTypeService.service';
import IAddBandType, { AddBandTypeValidator } from './dto/IAddBandType.dto.';
import { EditBandTypeValidator, IEditBandTypeDto } from './dto/IEditBandType.dto';

class BandTypeController extends BaseController {
    async getAll(req: Request, res: Response) {

        this.services.bandType
            .getAll()
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error?.message);
            });
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.bandType
            .getById(id, DefaultBandTypeAdapterOptions)
            .then((result) => {
                if (result === null) {
                    return res.sendStatus(404);
                }
                res.send(result);
            })
            .catch((error) => {
                res.status(500).send(error?.message);
            });
    }

    async add(req: Request, res: Response) {
        const data = req.body as IAddBandType;

        if (!AddBandTypeValidator(data)) {
            return res.status(400).send(AddBandTypeValidator.errors);
        }

        this.services.bandType
            .add(data)
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                res.status(400).send(error?.message);
            });
    }

    async edit(req: Request, res: Response) {
        const id: number = +req.params?.id;

        const data = req.body as IEditBandTypeDto;

        if (!EditBandTypeValidator(data)) {
            return res.status(400).send(EditBandTypeValidator.errors);
        }

        this.services.bandType
            .getById(id, DefaultBandTypeAdapterOptions)
            .then((result) => {
                if (result === null) {
                    return res.sendStatus(404);
                }
                this.services.bandType
                    .editById(id, {
                        name: data.name,
                    })
                    .then((result) => {
                        res.send(result);
                    })
                    .catch((error) => {
                        res.status(500).send(error?.message);
                    });
            })
            .catch((error) => {
                res.status(500).send(error?.message);
            });
    }

}

export default BandTypeController;