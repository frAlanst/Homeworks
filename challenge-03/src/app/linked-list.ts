export class SimpleNode<T> {
  data: T;
  next: SimpleNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class SinglyLinkedList<T> {
  head: SimpleNode<T> | null = null;

  // Insertar al final
  add(data: T): void {
    const newNode = new SimpleNode(data);
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

  remove(data: T): void {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
    }
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}

export class DoubleNode<T> {
  data: T;
  next: DoubleNode<T> | null = null;
  prev: DoubleNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class DoublyLinkedList<T> {
  head: DoubleNode<T> | null = null;
  tail: DoubleNode<T> | null = null;
  currentPointer: DoubleNode<T> | null = null;

  add(data: T): void {
    const newNode = new DoubleNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.currentPointer = newNode;
      return;
    }

    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  goNext(): T | null {
    if (this.currentPointer && this.currentPointer.next) {
      this.currentPointer = this.currentPointer.next;
      return this.currentPointer.data;
    }
    return null;
  }
  
  goPrev(): T | null {
    if (this.currentPointer && this.currentPointer.prev) {
      this.currentPointer = this.currentPointer.prev;
      return this.currentPointer.data;
    }
    return null;
  }

  getCurrent(): T | null {
    return this.currentPointer ? this.currentPointer.data : null;
  }

  toArray(): T[] {
    const result: T[] = [];
    let temp = this.head;
    while (temp) {
      result.push(temp.data);
      temp = temp.next;
    }
    return result;
  }
}