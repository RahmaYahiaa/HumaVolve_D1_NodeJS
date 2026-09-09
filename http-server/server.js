import http from 'http';

const students = [
    { id: 1, name: "Ahmed", age: 20 },
    { id: 2, name: "Sara", age: 21 }
];

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/students") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(students));
    }

    if (req.method === "POST" && req.url === "/students") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const newStudent = JSON.parse(body);
            students.push(newStudent);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newStudent));
        });
    }

    if (req.method === "PUT" && req.url.startsWith("/students/")) {
        const id = parseInt(req.url.split("/")[2]);
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const updatedStudent = JSON.parse(body);

            const index = students.findIndex(
                student => student.id === id
            );

            if (index !== -1) {
                students[index] = {
                    ...students[index],
                    ...updatedStudent
                };

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify(students[index]));
            } else {
                res.writeHead(404, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Student not found"
                }));
            }
        });
    }

    if (req.method === "DELETE" && req.url === "/students") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const { id } = JSON.parse(body);

            const index = students.findIndex(
                student => student.id === id
            );

            if (index === -1) {
                res.writeHead(404, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Student not found"
                }));

                return;
            }

            const deletedStudent = students.splice(index, 1);

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(deletedStudent[0]));
        });
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});