export interface City {
  id: string;
  name: string;
}
export interface Person extends City {
  age: number;
  cityId: string;
}
export interface Friendship {
  a: string;
  b: string;
}
export interface Network {
  cities: City[];
  people: Person[];
  friends: Friendship[];
}

export function example(): Network {
  return {
    cities: [
      { id: "c1", name: "Cali" },
      { id: "c2", name: "Bogotá" },
    ],
    people: [
      { id: "p1", name: "Ana", age: 21, cityId: "c1" },
      { id: "p2", name: "Mateo", age: 24, cityId: "c1" },
      { id: "p3", name: "Sara", age: 22, cityId: "c2" },
    ],
    friends: [
      { a: "p1", b: "p2" },
      { a: "p2", b: "p3" },
    ],
  };
}
