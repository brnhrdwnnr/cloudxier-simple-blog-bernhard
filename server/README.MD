server

sequelize model:generate --name Blog --attributes title:string,authorName:string,content:text,imageUrl:string
sequelize model:generate --name Comment --attributes comment:string,BlogId:integer



client

npx create-react-app client
cd client
npm start