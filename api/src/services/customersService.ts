import { CustomersRepository } from '../repositories/customersRepository'



export class CustomersService {
    constructor(private readonly customersRepository: CustomersRepository) { }

    async find() {
        return await this.customersRepository.find()
    }
}