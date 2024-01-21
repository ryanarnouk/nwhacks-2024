export default function Parser(dataString) {
    const regex = /([\w\s]+): *([\d.]+) *(\w+)?/g;

    let match;
    const parsedData = {};

    while ((match = regex.exec(dataString)) !== null) {
        const [, key, value, unit] = match;
        const formattedKey = key.trim().toLowerCase().replace(/\s+/g, '_'); // Trim and convert to lowercase
        parsedData[formattedKey] = { value: parseFloat(value), unit: unit || null };
    }

    return parsedData;
}