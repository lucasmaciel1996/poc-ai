import { InvoicesRepository } from './repositories/invoicesRepository'
import { InvoicesService } from './services/invoicesService'
import { InvoicesControler } from './controllers/invoicesControler'
import { DatabaseSqlite } from './config/sqlite'

import { AIService } from './services/aiService'
import { AIControler } from './controllers/aiControler'

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
        const invoicesRepository = new InvoicesRepository(DatabaseSqlite)
        const invoicesService =  new InvoicesService(invoicesRepository)
        this.dependencies.set('InvoicesControler', new InvoicesControler(invoicesService))

        const aiService = new AIService()
        this.dependencies.set('AIControler', new AIControler(aiService))
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