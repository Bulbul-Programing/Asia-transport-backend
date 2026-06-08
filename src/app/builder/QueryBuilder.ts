type QueryParams = Record<string, unknown>

class QueryBuilder<T> {
    public query: QueryParams;
    public prismaQuery: any;

    constructor(query: QueryParams) {
        this.query = query;
        this.prismaQuery = {};
    }

    searching(searchableFields: string[]) {
        const searchTerm = this.query.searchTerm as string

        if (!searchTerm) return this

        const orConditions = searchableFields.map((field) => {
            if (field.includes('.')) {
                const [relation, relationField] = field.split('.')

                return {
                    [relation]: {
                        [relationField]: { contains: searchTerm, mode: "insensitive" }
                    }
                }
            }

            return {
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            };

        })

        this.prismaQuery.where = {
            ...this.prismaQuery.where,
            OR: orConditions,
        }
        return this;
    }

    filterByDate(field: string) {
        const date = this.query.date as string;
        if (!date) return this;

        const startDate = new Date(`${date}`);
        const endDate = new Date(`${date}`);
        endDate.setUTCDate(endDate.getUTCDate() + 1);

        this.prismaQuery.where = {
            ...this.prismaQuery.where,
            [field]: {
                gte: startDate,
                lt: endDate,
            },
        };
        return this;
    }

    filterByDateRange(field: string) {
        const startDate = this.query.startDate as string;
        const endDate = this.query.endDate as string;

        if (!startDate || !endDate) return this;

        const start = new Date(`${startDate}T00:00:00.000Z`);
        const end = new Date(`${endDate}`);
        end.setUTCDate(end.getUTCDate() + 1);

        this.prismaQuery.where = {
            ...this.prismaQuery.where,
            [field]: {
                gte: start,
                lt: end,
            },
        };

        return this;
    }

    sort() {
        const sort = this.query.sort as string;

        if (sort) {
            this.prismaQuery.orderBy = sort.split(',').map((field) => {
                if (field.startsWith('-')) {
                    return { [field.slice(1)]: 'desc' };
                }
                return { [field]: 'asc' };
            });
        } else {
            this.prismaQuery.orderBy = { createdAt: 'desc' };
        }

        return this;
    }

    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;

        this.prismaQuery.skip = (page - 1) * limit;
        this.prismaQuery.take = limit;

        return this;
    }

    fields() {
        if (this.query.fields) {
            this.prismaQuery.select = (this.query.fields as string)
                .split(',')
                .reduce((acc, field) => {
                    acc[field] = true;
                    return acc;
                }, {} as Record<string, boolean>);
        }

        return this;
    }

    build() {
        return this.prismaQuery;
    }
}

export default QueryBuilder;