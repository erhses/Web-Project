export async function fetchData() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/6577d6841f5677401f0c9d82`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Master-Key': '$2a$10$q55sO.wPJT4O4ZYnv335q.sJU/UnipAXbgmdcal7B/6o8K81byh4O'
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}