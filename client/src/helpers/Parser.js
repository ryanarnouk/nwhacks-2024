export default function Parser(dataString) {
    const regex = /([\w\s]+): ([\d.]+) (\w+|%|°C|PPM)/g;

    let match;
    const parsedData = {};

    while ((match = regex.exec(dataString)) !== null) {
    const [, key, value, unit] = match;
    const formattedKey = key.toLowerCase().replace(/\s+/g, '_'); // Convert to lowercase and replace spaces with underscores
    parsedData[formattedKey] = { value: parseFloat(value), unit };
    }

    return parsedData;
}