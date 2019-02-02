Environment for run program (use on this version or Compatible)
-------------
node v8.9.4 <br />
mongoDB v4.0.5 <br />
docker toolbox current (because i have ram 4GB ,can't install docker Desktop) <br />
docker-compose version 1.20.1 <br />

How to run it (command in folder project)
-------------
```
> run MongoDB (C:/data/db)

$ mongod

> if create data/db in other path

$ mongod --dbpath=D:/data/db
```
```
> install node module before 

$ npm install
```
```
> for start project 

$ npm run start
```
```
> for test api by mocha and chai 

$ npm run test
```
Use docker
-------------
```
> ติดตั้ง Docker ให้เรียบร้อย ( I used docker toolbox )
> ตรวจสอบ default machine IP ( my IP's 192.168.99.100 )
> เปลี่ยน var connectDB จาก "localhost" เป็น "mongo" ในไฟล์ server.js
> เมื่อ run docker-compose สำเร็จ ให้เรียก 192.168.99.100:3000 ใน browser เพื่อเข้าถึง REST API
```
```
$ docker-compose up
> เพื่อติดตั้ง run docker-compose
```
```
$ docker-compose up --build
> เมื่อมีการเปลี่ยนแปลงแก้ไข
```
How to set up API
-------------
```
Schema data
{
    topic:  String,
    description: String,
    status: Boolean
}
> id เป็น primary key ที่ Mongodb สร้างให้อัตโนมัติ
```
```
/GET tasks
localhost:3000/tasks
> เรียกดูข้อมูลทั้งหมด
```
```
/GET tasks/:id
localhost:3000/tasks/156df1sa56131f2ds3
> เรียกดูข้อมูลตาม id
```
```
/POST tasks
localhost:3000/tasks
> ใส่ข้อมูล ( ใส่ข้อมูล json ใน body )
> หากไม่ส่งค่า status ระบบจะ default {status : false}
```
```
/PUT tasks/:id
localhost:3000/tasks/156df1sa56131f2ds3
> แก้ไขข้อมูลตาม id ( ใส่ข้อมูล json ใน body )
```
```
/PUT tasks/status/:id
localhost:3000/tasks/status/156df1sa56131f2ds3
> เปลี่ยนสถานะ status ตาม id
```
```
/DELETE tasks/:id
localhost:3000/tasks/status/156df1sa56131f2ds3
> ลบข้อมมูลตาม id
```
