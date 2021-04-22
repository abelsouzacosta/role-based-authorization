import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import { Product } from '../typeorm/entities/Product';

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const repository: ProductRepository = getCustomRepository(
      ProductRepository,
    );

    const products = await repository.find();

    if (!products) throw new ApplicationError('No products were found');

    return products;
  }
}
