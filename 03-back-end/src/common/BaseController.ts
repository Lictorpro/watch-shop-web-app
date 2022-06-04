import { IServices } from './IAplicationResources.interface';
export default abstract class BaseController{
    private serviceInstances: IServices;

    constructor(services: IServices){
        this.serviceInstances = services;
    }

    protected get services(): IServices{
        return this.serviceInstances;
    }
}