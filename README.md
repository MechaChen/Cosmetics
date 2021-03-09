Cosmetics

# Server

## 1. 讓 nodemon 可以 watch TypeScript file

https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change

&nbsp;
1. 執行 `Custom Command`
```jsx
    nodemon --watch "src/**" --ext "ts,json" --ignore "src/**/*.spec.ts" --exec "ts-node src/index.ts"
```

&nbsp;

2. 在 root 加入 `nodemon.json`
```json
    {
        "watch": ["src"],
        "ext": "ts,json",
        "ignore": ["src/**/*.spec.ts"],
        "exec": "ts-node ./src/index.ts"      // or "npx ts-node src/index.ts"
    }
```
接著直接 run `nodemon`


&nbsp;

&nbsp;

&nbsp;

## 2. 使 require (CommonJS) 可以使用在 TypeScript
https://stackoverflow.com/questions/31173738/typescript-getting-error-ts2304-cannot-find-name-require

&nbsp;

若為 TypeScript 2.x，可以直接安裝
```jsx
    npm install @types/node --save-dev
```

&nbsp;

再將 tsconfig.json 加入以下程式
```
    "types": ["node"],
    "typeRoots": ["../node_modules/@types"]
```


&nbsp;

&nbsp;

&nbsp;

## 3. 在 Node.js 使用 ES6 import / export
https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js

&nbsp;

### 1. 若 Node.js >= v.13

1. 將檔案存為 `.mjx` 檔
2. 或在 `package.json` 加入 `{ "type": "module" }`

&nbsp;

### 2. 若 Node.js <= v.12 && Node.js >= 8

1. 將檔案存為 `.mjs` 檔且執行下列指令

```jsx
    node --experimental-modules my-app.mjs
```
