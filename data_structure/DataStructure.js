class Stack {
    constructor() {
        this.stack = [];
    }

    make_null() {
        this.stack = [];
    }

    empty(){
        return this.stack.length === 0;
    }

    push(element) {
        this.stack.push(element);
    }

    pop() {
        if (this.stack.length > 0) {
            return this.stack.pop();
        }
    }

    sort(){
        this.stack.sort();
    }

    print() {
        console.log(this.stack.toString());
    }

    top() {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        }
    }
}

class Queue {
    constructor() {
        this.queue = [];
    }

    // Tạo queue rỗng
    make_null() {
        this.queue = [];
    }

    empty() {
        return this.queue.length == 0;
    }

    // Thêm phần tử vào queue
    enqueue(element) {
        this.queue.push(element);
    }

    // Xóa phần tử ra khỏi queue
    dequeue() {
        if (this.queue.length > 0) {
            return this.queue.shift();
        }
    }

    // In hàng đợi ra màn hình
    print() {
        console.log(this.queue.join(', '));
    }

    // Trả về phần tử đầu tiên của hàng đợi
    front() {
        if (this.queue.length > 0) {
            return this.queue[0];
        }
    }
}


export { Stack, Queue };