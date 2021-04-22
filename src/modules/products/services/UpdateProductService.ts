import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  description: string;
}

export default class UpdateProductService {
  public async execute({ id, name, description }: IRequest): Promise<Product> {
    const repository: ProductRepository = getCustomRepository(
      ProductRepository,
    );

    const product = await repository.findById(id);

    if (!product) throw new ApplicationError('Product not found');

    const productByName = await repository.findByName(name);

    if (productByName && productByName.id !== product.id)
      throw new ApplicationError('This product already exists');

    product.name = name;
    product.description = description;

    await repository.save(product);

    return product;
  }
}
