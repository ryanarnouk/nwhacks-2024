export default class BufferStream {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.buffer = [];
    }

    add(elem) {
        this.buffer.push(elem)

        if (this.buffer.length > this.maxSize) {
            this.buffer.shift();
        }
    }

    getBuffer() {
        return this.buffer;
    }
}