import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const repository: ProductRepository = getCustomRepository(
      ProductRepository,
    );

    // verifica se o produto realmente existe
    const product = await repository.findById(id);

    if (!product) throw new ApplicationError('Product not found');

    // remove o produto
    await repository.remove(product);
  }
}
