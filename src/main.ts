import {
  Component,
  computed,
  provideZonelessChangeDetection,
  signal,
} from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { GraphView } from "./graph";
import { Network, Person, example } from "./model";

const key = "atlas-amistades-v1";
@Component({
  selector: "app-root",
  imports: [FormsModule, GraphView],
  templateUrl: "./app.html",
})
class App {
  graph = signal<Network>(example());
  city = signal("");
  residents = computed(() =>
    this.graph()
      .people.filter((p) => p.cityId === this.city())
      .sort((a, b) => a.name.localeCompare(b.name, "es")),
  );
  notice = signal("");
  cityName = "";
  cityEdit = "";
  name = "";
  age: number | null = null;
  home = "";
  personEdit = "";
  first = "";
  second = "";
  constructor() {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const value = JSON.parse(saved);
        if (![value.cities, value.people, value.friends].every(Array.isArray))
          throw Error();
        this.graph.set(value);
      }
    } catch {
      this.notice.set(
        "No se pudo leer la red guardada. Se muestra el ejemplo.",
      );
    }
    this.city.set(this.graph().cities[0]?.id ?? "");
    this.home = this.city();
  }
  save(next: Network) {
    this.graph.set(next);
    this.notice.set("");
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      this.notice.set(
        "El navegador no pudo guardar los cambios para la próxima sesión.",
      );
    }
  }
  cityTitle(id: string) {
    return this.graph().cities.find((c) => c.id === id)?.name ?? "";
  }
  personTitle(id: string) {
    return this.graph().people.find((p) => p.id === id)?.name ?? "";
  }
  saveCity() {
    const g = this.graph(),
      name = this.cityName.trim();
    if (!name) return;
    if (
      g.cities.some(
        (c) =>
          c.id !== this.cityEdit &&
          c.name.localeCompare(name, "es", { sensitivity: "accent" }) === 0,
      )
    ) {
      this.notice.set("La ciudad ya existe.");
      return;
    }
    const id = this.cityEdit || crypto.randomUUID();
    const cities = this.cityEdit
      ? g.cities.map((c) => (c.id === id ? { id, name } : c))
      : [...g.cities, { id, name }];
    this.save({ ...g, cities });
    this.city.set(id);
    if (!this.personEdit) this.home = id;
    this.cityEdit = "";
    this.cityName = "";
  }
  removeCity() {
    const id = this.city();
    if (this.residents().length) {
      this.notice.set("Cambia de ciudad a sus habitantes antes de eliminarla.");
      return;
    }
    const g = this.graph(),
      cities = g.cities.filter((c) => c.id !== id);
    this.save({ ...g, cities });
    this.city.set(cities[0]?.id ?? "");
    if (this.home === id) this.home = this.city();
    this.cityEdit = "";
    this.cityName = "";
  }
  savePerson() {
    const g = this.graph(),
      name = this.name.trim(),
      age = this.age;
    if (
      !name ||
      age === null ||
      !Number.isInteger(age) ||
      age < 0 ||
      !g.cities.some((c) => c.id === this.home)
    )
      return;
    const person = {
      id: this.personEdit || crypto.randomUUID(),
      name,
      age,
      cityId: this.home,
    };
    const people = this.personEdit
      ? g.people.map((p) => (p.id === this.personEdit ? person : p))
      : [...g.people, person];
    this.save({ ...g, people });
    this.city.set(this.home);
    this.resetPerson();
  }
  edit(p: Person) {
    this.personEdit = p.id;
    this.name = p.name;
    this.age = p.age;
    this.home = p.cityId;
  }
  resetPerson() {
    this.personEdit = "";
    this.name = "";
    this.age = null;
    this.home = this.city();
  }
  removePerson(id: string) {
    const g = this.graph();
    this.save({
      ...g,
      people: g.people.filter((p) => p.id !== id),
      friends: g.friends.filter((f) => f.a !== id && f.b !== id),
    });
    if (this.personEdit === id) this.resetPerson();
    if (this.first === id) this.first = "";
    if (this.second === id) this.second = "";
  }
  addFriend() {
    const g = this.graph(),
      [a, b] = [this.first, this.second].sort();
    if (!a || !b || a === b) {
      this.notice.set("Elige dos personas distintas.");
      return;
    }
    if (
      g.friends.some(
        (f) => (f.a === a && f.b === b) || (f.a === b && f.b === a),
      )
    ) {
      this.notice.set("Esta amistad ya existe.");
      return;
    }
    this.save({ ...g, friends: [...g.friends, { a, b }] });
    this.first = "";
    this.second = "";
  }
  removeFriend(a: string, b: string) {
    const g = this.graph();
    this.save({
      ...g,
      friends: g.friends.filter((f) => f.a !== a || f.b !== b),
    });
  }
  pick(id: string) {
    const p = this.graph().people.find((item) => item.id === id);
    if (p) {
      this.city.set(p.cityId);
      this.edit(p);
    } else this.city.set(id);
  }
  print() {
    window.print();
  }
}
bootstrapApplication(App, {
  providers: [provideZonelessChangeDetection()],
}).catch(console.error);
