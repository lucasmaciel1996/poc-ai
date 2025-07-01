import { InvoicesRepository } from './repositories/invoicesRepository'
import { InvoicesService } from './services/invoicesService'
import { InvoicesControler } from './controllers/invoicesControler'
import { dbClient } from './config/database'

import { AIService } from './services/aiService'
import { AIControler } from './controllers/aiControler'
import { CustomersControler } from './controllers/customersControler'
import { CustomersRepository } from './repositories/customersRepository'
import { CustomersService } from './services/customersService'

export class Container {
    private static instance: Container
    private dependencies: Map<string, any> = new Map()

    private constructor() {
        this.registerDependencies()
    }

    static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container()
        }
        return Container.instance
    }

    private registerDependencies(): void {
        const invoicesRepository = new InvoicesRepository(dbClient)
        const invoicesService =  new InvoicesService(invoicesRepository)
        this.dependencies.set('InvoicesControler', new InvoicesControler(invoicesService))

        const aiService = new AIService()
        this.dependencies.set('AIControler', new AIControler(aiService))


        
        const customersRepository = new CustomersRepository(dbClient)
        const customersService = new CustomersService(customersRepository)
        this.dependencies.set('CustomersControler', new CustomersControler(customersService))
    }

    get<T>(key: string): T {
        const dependency = this.dependencies.get(key)
        if (!dependency) {
            throw new Error(`Dependency ${key} not found`)
        }
        return dependency
    }
}

export const container = Container.getInstance() 