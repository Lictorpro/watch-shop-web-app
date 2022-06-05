import BaseController from "../../common/BaseController";
import { Request, Response } from "express";
import {
  AddAdministratorValidator,
  IAddAdministratorDto,
} from "./dto/IAddAdministrator.dto";
import * as bcrypt from "bcrypt";
import {
  IEditAdministratorDto,
  EditAdministratorValidator,
} from "./dto/IEditAdministrator.dto";

export default class AdministratorController extends BaseController {
  getAll(req: Request, res: Response) {
    this.services.administrator
      .getAll({ removePassword: true })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error?.message);
      });
  }

  getById(req: Request, res: Response) {
    const id: number = +req.params?.id;

    this.services.administrator
      .getById(id, { removePassword: true })
      .then((result) => {
        if (result === null) {
          res.status(404).send("Administrator not found!");
        }

        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error?.message);
      });
  }

  add(req: Request, res: Response) {
    const body = req.body as IAddAdministratorDto;

    if (!AddAdministratorValidator(body)) {
      return res.status(400).send(AddAdministratorValidator.errors);
    }

    const passwordHash = bcrypt.hashSync(body.password, 10);

    this.services.administrator
      .add({
        username: body.username,
        password_hash: passwordHash,
      })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error?.message);
      });
  }

  editById(req: Request, res: Response) {
    const id: number = +req.params?.id;
    const data = req.body as IEditAdministratorDto;

    if (!EditAdministratorValidator(data)) {
      return res.status(400).send(EditAdministratorValidator.errors);
    }

    const passwordHash = bcrypt.hashSync(data.password, 10);

    this.services.administrator
      .edit(id, {
        password_hash: passwordHash,
      })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(500).send(error?.message);
      });
  }
}
