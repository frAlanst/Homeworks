export interface Product {
  name: string;
  popularity: number;
}

function normalize(text: string): string {
  return text.normalize('NFC').toLowerCase().trim().replace(/\s+/gu, ' ');
}

// Valor positivo: a debe aparecer antes que b en el resultado.
function compare(a: Product, b: Product): number {
  if (a.popularity !== b.popularity) return a.popularity - b.popularity;
  return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
}

class TopKHeap {
  private items: Product[] = [];
  constructor(private capacity: number) {}

  offer(product: Product): void {
    const heap = this.items;
    if (heap.length < this.capacity) {
      let i = heap.length;
      heap.push(product);
      while (i > 0) {
        const parent = Math.floor((i - 1) / 2);
        if (compare(heap[parent], product) <= 0) break;
        heap[i] = heap[parent];
        i = parent;
      }
      heap[i] = product;
    } else if (compare(product, heap[0]) > 0) {
      heap[0] = product;
      this.siftDown();
    }
  }

  private siftDown(): void {
    const heap = this.items;
    let i = 0;
    while (2 * i + 1 < heap.length) {
      let child = 2 * i + 1;
      const right = child + 1;
      if (right < heap.length && compare(heap[right], heap[child]) < 0) child = right;
      if (compare(heap[i], heap[child]) <= 0) break;
      [heap[i], heap[child]] = [heap[child], heap[i]];
      i = child;
    }
  }

  ranked(): Product[] {
    // Extraemos primero el peor candidato y llenamos el resultado desde el final.
    const result = new Array<Product>(this.items.length);
    while (this.items.length) {
      result[this.items.length - 1] = { ...this.items[0] };
      const last = this.items.pop()!;
      if (this.items.length) {
        this.items[0] = last;
        this.siftDown();
      }
    }
    return result;
  }
}

class TrieNode {
  children = new Map<string, TrieNode>();
  product?: Product;
}

export class ProductTrie {
  private root = new TrieNode();
  size = 0;

  insert(name: string, popularity: number): void {
    const key = normalize(name);
    if (!key || !Number.isFinite(popularity) || popularity < 0) {
      throw new Error('Ingresa un nombre y una popularidad igual o mayor que cero.');
    }
    let node = this.root;
    for (const letter of key) {
      let next = node.children.get(letter);
      if (!next) {
        next = new TrieNode();
        node.children.set(letter, next);
      }
      node = next;
    }
    if (!node.product) this.size++;
    node.product = { name: key, popularity };
  }

  searchTopK(prefix: string, k: number): Product[] {
    if (!Number.isSafeInteger(k) || k <= 0) return [];
    let node = this.root;
    for (const letter of normalize(prefix)) {
      const next = node.children.get(letter);
      if (!next) return [];
      node = next;
    }
    const candidates = new TopKHeap(k);
    const pending = [node];
    while (pending.length) {
      const current = pending.pop()!;
      if (current.product) candidates.offer(current.product);
      for (const child of current.children.values()) pending.push(child);
    }
    return candidates.ranked();
  }
}
