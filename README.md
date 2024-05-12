## Node:

- Create the package.json file
npm init -y

- Install nodemon
npx nodemon .\src\app 

#Typescript: 
- Install typescript andits type definitions for Node.js- "-D" for development. "@types/node" is the package that contains type definitions for the Node.js environment.
npm i -D typescript @types/node    

- Create the tsconfig.json file with the outDir and rootDir properties.
npx tsc --init --outDir dist/ --rootDir src

- Compile the TypeScript files with the tsc command (OPTIONAL)
npx tsc --watch

- Run the TypeScript files with the nodemon command (REQUIRED)
npm install -D ts-node nodemon
ts-node .\src\app.ts

    - Create nodemon.json
    {
        "watch": ["src"],
        "ext": ".js,.ts",
        "ignore": [],
        "exec": "npx ts-node ./src/app.ts"
    }

- Run the TypeScript files with the nodemon command (REQUIRED)
npm run dev

npm install -D rimraf

- Execute the application. Creates the dist js files
npm start

- Install typescript and dependencies, quickly without nodemon:
npm i -D typescript @types/node ts-node-dev rimraf
npx tsc --init --outDir dist/ --rootDir src


- Install express
npm install express --save
  