export class StudentNode {
  code: string;
  name: string;
  age: number;
  next: StudentNode | null;

  constructor(code: string, name: string, age: number) {
    this.code = code;
    this.name = name;
    this.age = age;
    this.next = null;
  }
}


export class StudentLinkedList {
  head: StudentNode | null = null;

 
  add(code: string, name: string, age: number): void {
    const newNode = new StudentNode(code, name, age);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  remove(code: string): void {
    if (!this.head) return;

    if (this.head.code === code) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next && current.next.code !== code) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
    }
  }

  // Convierte la lista enlazada a un arreglo para que el HTML pueda renderizarlo
  toArray(): StudentNode[] {
    const nodes: StudentNode[] = [];
    let current = this.head;
    while (current) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  }
}