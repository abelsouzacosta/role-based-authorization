import ApplicationError from '@shared/errors/ApplicationError';
import { getCustomRepository, Repository } from 'typeorm';
import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  description: string;
}

export default class CreateProductService {
  public async execute({ name, description }: IRequest): Promise<Product> {
    const repository: ProductRepository = getCustomRepository(
      ProductRepository,
    );

    // verifica se já existe um produto com o mesmo nome
    const findProductByName = await repository.findByName(name);

    if (findProductByName)
      throw new ApplicationError('This product already exists');

    // cria o produto
    const product = repository.create({
      name,
      description,
    });

    // salva o produto no banco de dados
    await repository.save(product);

    return product;
  }
}
