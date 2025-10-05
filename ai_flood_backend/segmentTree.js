// filepath: ai_flood_backend/segmentTree.js
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.lazy = new Array(4 * this.n).fill(0);
    this.build(arr, 0, 0, this.n - 1);
  }

  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      this.build(arr, 2 * node + 1, start, mid);
      this.build(arr, 2 * node + 2, mid + 1, end);
      this.tree[node] = Math.max(this.tree[2 * node + 1], this.tree[2 * node + 2]);
    }
  }

  updateLazy(node, start, end) {
    if (this.lazy[node] !== 0) {
      this.tree[node] += this.lazy[node];
      if (start !== end) {
        this.lazy[2 * node + 1] += this.lazy[node];
        this.lazy[2 * node + 2] += this.lazy[node];
      }
      this.lazy[node] = 0;
    }
  }

  // Range update: add value to range [l, r]
  updateRange(node, start, end, l, r, value) {
    this.updateLazy(node, start, end);
    if (start > end || start > r || end < l) return;

    if (start >= l && end <= r) {
      this.tree[node] += value;
      if (start !== end) {
        this.lazy[2 * node + 1] += value;
        this.lazy[2 * node + 2] += value;
      }
      return;
    }

    const mid = Math.floor((start + end) / 2);
    this.updateRange(2 * node + 1, start, mid, l, r, value);
    this.updateRange(2 * node + 2, mid + 1, end, l, r, value);
    
    this.updateLazy(2 * node + 1, start, mid);
    this.updateLazy(2 * node + 2, mid + 1, end);
    this.tree[node] = Math.max(this.tree[2 * node + 1], this.tree[2 * node + 2]);
  }

  // Range query: get maximum in range [l, r]
  queryRange(node, start, end, l, r) {
    if (start > end || start > r || end < l) return -Infinity;

    this.updateLazy(node, start, end);
    
    if (start >= l && end <= r) return this.tree[node];

    const mid = Math.floor((start + end) / 2);
    const p1 = this.queryRange(2 * node + 1, start, mid, l, r);
    const p2 = this.queryRange(2 * node + 2, mid + 1, end, l, r);
    return Math.max(p1, p2);
  }

  // Public methods
  update(l, r, value) {
    this.updateRange(0, 0, this.n - 1, l, r, value);
  }

  query(l, r) {
    return this.queryRange(0, 0, this.n - 1, l, r);
  }
}

module.exports = SegmentTree;