const { UUID } = require('crypto');

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

interface DBUniqueness {
  mangledName: string;
}

declare module Recipe {
  interface Self {
    id: UUID;
    imageUrl?: string;
    title: string;
    instructions: string;
    glasswareId: UUID;
  }

  module API {
    interface Create {
      title: string;
      imageUrl?: string;
      instructions: string;
      glasswareId: UUID;
      garnishInputs?:
        | {
            garnishId: UUID;
            index: number;
            quanitity: number;
          }[]
        | null;
      ingredientInputs: {
        ingredientId: UUID;
        index: number;
        quantity: number;
        unit: Unit;
      }[];
    }

    type Edit = DeepPartial<Create>;
  }

  module DB {
    type Create = API.Create & DBUniqueness;
    type Edit = API.Edit & DeepPartial<DBUniqueness>;
  }
}

declare module Ingredient {
  interface Self {
    id: UUID;
    name: string;
    abv: number?;
  }

  module API {
    interface Create {
      name: string;
      abv: number?;
    }

    type Edit = DeepPartial<Create>;
  }

  module DB {
    type Create = API.Create & DBUniqueness;
    type Edit = API.Edit & DeepPartial<DBUniqueness>;
  }
}

declare module Glassware {
  interface Self {
    id: UUID;
    name: string;
  }

  module API {
    interface Create {
      name: string;
    }
    type Edit = Create;
  }

  module DB {
    type Create = API.Create & DBUniqueness;
    type Edit = API.Edit & DBUniqueness;
  }
}

declare module Garnish {
  interface Self {
    id: UUID;
    name: string;
  }

  module API {
    interface Create {
      name: string;
    }
    type Edit = Create;
  }

  module DB {
    type Create = API.Create & DBUniqueness;
    type Edit = API.Edit & DBUniqueness;
  }
}

enum Unit {
  OZ = 'oz',
  TSP = 'tsp',
  TBSP = 'tbsp',
  DASH = 'dash',
  DROP = 'drop',
  EACH = 'each',
}

interface DatabaseError {
  code: string;
}
