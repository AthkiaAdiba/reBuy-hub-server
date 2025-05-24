import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = [
      'searchTerm',
      'price',
      'sort',
      'limit',
      'page',
      'fields',
      'sortBy',
      'sortOrder',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  priceFilter() {
    const priceQueryField = this?.query?.price;
    if (priceQueryField) {
      const parsedPrice = Number(priceQueryField);

      this.modelQuery = this.modelQuery.find({ price: { $lte: parsedPrice } });
    }

    return this;
  }

  sort() {
    const sort = this.query.sort as string;
    const sortBy = this.query.sortBy as string;
    const sortOrder = (this.query.sortOrder as string)?.toLowerCase();

    if (sort) {
      // Old format: ?sort=-email,name
      const formattedSort = sort.split(',').join(' ');
      this.modelQuery = this.modelQuery.sort(formattedSort);
    } else if (sortBy) {
      // New format: ?sortBy=email,name&sortOrder=asc,desc
      const sortByFields = sortBy.split(',');
      const sortOrderFields = sortOrder?.split(',') || [];

      const sortObj: Record<string, 1 | -1> = {};

      sortByFields.forEach((field, index) => {
        const order = sortOrderFields[index] === 'asc' ? 1 : -1;
        sortObj[field] = order;
      });

      this.modelQuery = this.modelQuery.sort(sortObj);
    } else {
      // Default sorting
      this.modelQuery = this.modelQuery.sort('-createdAt');
    }

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    // console.log(filter);
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

// class QueryBuilder<T> {
//   public modelQuery: Query<T[], T>;
//   public query: Record<string, unknown>;

//   constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
//     this.modelQuery = modelQuery;
//     this.query = query;
//   }

//   search(searchableFields: string[]) {
//     const searchTerm = this?.query?.searchTerm;
//     if (searchTerm) {
//       this.modelQuery = this.modelQuery.find({
//         $or: searchableFields.map(
//           (field) =>
//             ({
//               [field]: { $regex: searchTerm, $options: 'i' },
//             }) as FilterQuery<T>,
//         ),
//       });
//     }

//     return this;
//   }

//   filter() {
//     const queryObj = { ...this.query }; // copy

//     // Filtering
//     const excludeFields = [
//       'searchTerm',
//       'price',
//       'sort',
//       'limit',
//       'page',
//       'fields',
//     ];
//     excludeFields.forEach((el) => delete queryObj[el]);

//     this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

//     return this;
//   }

//   priceFilter() {
//     const priceQueryField = this?.query?.price;
//     if (priceQueryField) {
//       const parsedPrice = Number(priceQueryField);

//       this.modelQuery = this.modelQuery.find({ price: { $lte: parsedPrice } });
//     }

//     return this;
//   }

//   sort() {
//     const sort =
//       (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
//     this.modelQuery = this.modelQuery.sort(sort as string);

//     return this;
//   }

//   paginate() {
//     const page = Number(this?.query?.page) || 1;
//     const limit = Number(this?.query?.limit) || 10;
//     const skip = (page - 1) * limit;

//     this.modelQuery = this.modelQuery.skip(skip).limit(limit);

//     return this;
//   }

//   fields() {
//     const fields =
//       (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

//     this.modelQuery = this.modelQuery.select(fields);

//     return this;
//   }

//   async countTotal() {
//     const totalQueries = this.modelQuery.getFilter();
//     // console.log(filter);
//     const total = await this.modelQuery.model.countDocuments(totalQueries);
//     const page = Number(this?.query?.page) || 1;
//     const limit = Number(this?.query?.limit) || 10;
//     const totalPage = Math.ceil(total / limit);

//     return {
//       page,
//       limit,
//       total,
//       totalPage,
//     };
//   }
// }

export default QueryBuilder;
