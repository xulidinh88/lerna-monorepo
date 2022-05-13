## Với những dự án front-end lớn, việc sử dụng nhiều project trong 1 dự án có thể được xem như 1 giải pháp để có thể tối ưu và mở rộng ( Trang Admin và trang User riêng ).
## Ví dụ trên sử dụng mono repo và lerna để minh họa cho việc đó, branch common và branch web được sử dụng để quản lý 2 project reactjs riêng, và có những setup cụ thể
## Clone
``` root
git clone https://github.com/xulidinh88/lerna-monorepo.git
yarn
```
``` common
cd packages/common
yarn
```
```web
cd packages/web
yarn
yarn start
```
or
## Set up:
- Install lerna
```
npm install -g lerna
``` 
- Lerna init
```
lerna init
```
- `root/package.json`
```
{
  "name": "root",
  "private": true,
  "devDependencies": {
    "lerna": "^4.0.0"
  },
  "workspaces": [
    "packages/*"
  ]
}
```
- `root/lerna.json`
```
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```
- Khởi tạo `web` UI react app 
```
npx create-react-app web --template typescript
```
- Khởi tạo `common` react app
```
npx create-react-app common --template typescript
```
- Tạo thư mục componnents dùng chung `common`, và thêm `Button Component`
- Sửa file `index.tsx` ở thư mục `common`
```
import Button from "./components/button";

export { Button };
```
- Sửa `package.json` trong `common` trở thành: 
```
"name": "common",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.tsx",
  "dependencies": { ... }
  ...
```
- Từ root path: 
```
lerna add common --scope=web
```
- Install craco 
```
yarn add @craco/craco
```
- Thêm file `paths.json` vào thư mục `web`
```
{
    "compilerOptions": {
        "baseUrl": "./src",
        "paths": {
            "@components": [
                "src/components"
            ],
            "@containers": [
                "src/containers"
            ]
        }
    }
}
```
- Thêm file `craco.config.js` vào thư mục `web`
```
const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const packages = [];
packages.push(path.join(__dirname, "../common"));

module.exports = {
	webpack: {
		configure: (webpackConfig, arg) => {
			const { isFound, match } = getLoader(
				webpackConfig,
				loaderByName("babel-loader")
			);
			if (isFound) {
				const include = Array.isArray(match.loader.include)
					? match.loader.include
					: [match.loader.include];

				match.loader.include = include.concat(packages);
			}

			return webpackConfig;
		},
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
			"@containers": path.resolve(__dirname, "./src/containers")
		},
	},
};
```
- Chỉnh sửa file `ts.config.json` của thư mục `web`
```
{
  "extends": "./paths.json",
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "baseUrl": "./",
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```
- web path: 
```
yarn start
```
