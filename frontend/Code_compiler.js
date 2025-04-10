var request = require('request');

var program = {
    // script: "public class HelloWorld { public static void main(String[] args) {System.out.println(\"HELLO WORLD\");}}",
    // language: "java",
    script: "print(\"Hello, World!\")",
    language: "python3",
    // script: "#include <iostream>\nusing namespace std;\nint main() { cout << \"Hello, World!\" << endl; return 0; }",
    // language: "cpp",
    // script: "#include <stdio.h>\nint main() { printf(\"Hello, World!\\n\"); return 0; }",
    // language: "c",
    // versionIndex: "0",
    clientId: "e62d4057387c6c8bce14a640d81ee9ea",
    clientSecret: "4163ddb985f5901a7c7ae5aabd5105c539f6a84ce0d4f0205e4165e0f6354d9f"
};
request({
    url: 'https://api.jdoodle.com/v1/execute',
    method: "POST",
    json: program
},
    function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    });