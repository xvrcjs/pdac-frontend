class Criteria {
    constructor() {
        this.filters = [];
    }

    operators = {
        equals: (fieldValue, filterValue) => fieldValue === filterValue,
        in: (fieldValue, filterValues) => filterValues.includes(fieldValue),
    };

    add(filter) {
        this.filters.push(filter);
        return this;
    }

    reset(){
        this.filters = [];
        return this;
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((elem, key) => (elem && elem[key] !== undefined) ? elem[key] : undefined, obj);
    }

    applyFilter(item, filter) {
        const fieldValue = this.getNestedValue(item, filter.field);
        const operatorFn = this.operators[filter.operator];
        return operatorFn(fieldValue, filter.value);
    }

    apply(items) {
        return items.filter(item => this.filters.every(filter => {
            if (filter.type === 'or') {
                // Aplicar filtros OR
                return filter.filters.some(subFilter => this.applyFilter(item, subFilter));
            } else {
                // Aplicar filtros AND
                return this.applyFilter(item, filter);
            }
        }));
    }
}

export default Criteria;
