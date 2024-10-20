
export class DefaultLookUp {
    static getDefaultPrices() {
      return [
        { id: 1, amount: 3000 },
        { id: 2, amount: 5000 },
        { id: 3, amount: 10000 },
        { id: 4, amount: 20000 },
        { id: 5, amount: 50000 },
        { id: 6, amount: 100000 },
        { id: 7, amount: 250000 },
        { id: 8, amount: 500000 },
        { id: 9, amount: 750000 },
        { id: 10, amount: 1000000 },
        { id: 11, amount: 2000000 },
        { id: 12, amount: 5000000 },
        { id: 13, amount: 10000000 },
        { id: 14, amount: 20000000 },
        { id: 15, amount: 50000000 }
      ];
  };

  static getDefaultNumberFilters() {
    return [{id: 1, display:"1+"}, {id: 2, display:"2+"}, {id: 3, display:"3+"}, {id: 4, display:"4+"}, {id: 5, display:"5+"}]
}
}